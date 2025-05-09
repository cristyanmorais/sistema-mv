import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../Layout';
import ConfirmDialog from '../../visual-components/ConfirmDialog';

const ContractedServiceDetails = ({ isEditing = false }) => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { id } = useParams();
    const [employeeId, setEmployeeId] = useState(0);
    const [workId, setWorkId] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [numInstallments, setNumInstallment] = useState(1);
    const [originalNumInstallments, setOriginalNumInstallments] = useState('');
    const [paid, setPaid] = useState(false);
    
    const [employees, setEmployees] = useState([]);
    const [employeeIdInput, setEmployeeIdInput] = useState('');
    const [works, setWorks] = useState([]);
    const [workIdInput, setWorkIdInput] = useState('');

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/employees`)
        .then(response => setEmployees(response.data))
        .catch(error => console.error('Error: ', error));

        axios.get(`${BASE_URL}/api/works`)
        .then(response => setWorks(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);
    
    useEffect(() => {
        if (isEditing && id) {
            loadServiceForEdit(id);
        }
    }, [isEditing, id]);

    useEffect(() => {

        if (employeeId > 0 && workId > 0 && amount > 0 && date !== '' && description !== '' && numInstallments > 0) {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

        console.log('numInstallments: ', numInstallments);

    }, [employeeId, workId, amount, date, description, numInstallments]);

    const clearFields = () => {
        setEmployeeId(0);
        setWorkId(0);
        setAmount('');
        setDate('');
        setDescription('');
        setNumInstallment(1);
        setPaid(false);
    }

    const handleConfirm = () => {
        const data = {
            employee_id: employeeId,
            work_id: workId,
            amount: Number(amount),
            date,
            description,
            num_installments: numInstallments,
            paid
        }
        
        const sendContractedServiceData = async (data) => {
            try {
                if (isEditing && id) {
                    await axios.put(`${BASE_URL}/api/contracted-services/${id}`, data);
                    console.log('Serviço atualizado com sucesso!');
                    navigate('/contracted-services');
                } else {
                    await axios.post(`${BASE_URL}/api/contracted-services`, data);
                    console.log('Serviço cadastrado com sucesso!');
                    navigate('/contracted-services');
                }
            } catch (error) {
                console.error('Erro ao salvar serviço:', error);
            }
        };
        
        const sendCashRegisterData = (cashRegisterData) => {
            return axios.post(`${BASE_URL}/api/cash-register`, cashRegisterData);
        };

        
        
        sendContractedServiceData(data)
            .then(response => {
                console.log("Data successfully sent: ", response.data);

                const cashRegisterData = {
                    transaction_type: "contracted-services",
                    transaction_id: response.data.id,
                    transaction_date: date,
                    amount: Number(amount)
                }

                clearFields();
        
                if (paid === true) {
                    if (numInstallments > 1) {
                        handleInstallment(response.data.id);
                        cashRegisterData.amount = amount/numInstallments;
                    };

                    sendCashRegisterData(cashRegisterData)
                    .then(response => {
                        console.log("Cash Register request successfully sent: ", response.data);
                    
                        clearFields();
                    })
                    .catch(error => {
                        console.error("Error while sending Cash Register: ", error);
                    });
                } else {
                    handleInstallment(response.data.id);
                    clearFields();
                }
            })
    }

    const handleConfirm2 = async () => {
        let num_installments_changed = originalNumInstallments !== numInstallments;

        const serviceData = {
            employee_id: employeeId,
            work_id: workId,
            amount: Number(amount),
            date,
            description,
            num_installments: numInstallments,
            paid,
            num_installments_changed
        }

        try {
            if (isEditing && id) {
                await axios.put(`${BASE_URL}/api/contracted-services/${id}`, serviceData);
                console.log('Serviço atualizado com sucesso!');
            } else {
                await axios.post(`${BASE_URL}/api/contracted-services`, serviceData);
                console.log('Serviço cadastrado com sucesso!');
            }

            clearFields();
            navigate('/contracted-services');
        } catch (error) {
            console.error('Erro ao salvar Serviço:', error);
        }
    };

    const handleInstallment = (contractedServicesId) => {
        const installmentData = {
            transaction_id: contractedServicesId,
            transaction_type: 'contracted-services',
            amount,
            start_date: date,
            paid
        };

        return axios.post(`${BASE_URL}/api/installments`, installmentData).then(response => {
            console.log(`Installments successfully created: `, response.data);
        })
        .catch(error => {
            console.error(`Error while sending Installments: `, error);
        });
    };

    const handleDelete = async () => {
        if (isEditing && id) {
            try {
                await axios.put(`${BASE_URL}/api/contracted-services/${id}/delete`);
                alert("Serviço deletado com sucesso!");
                navigate('/contracted-services');
            } catch (error) {
                console.error("Erro ao deletar o serviço:", error);
                alert("Ocorreu um erro ao tentar deletar o serviço.");
            } finally {
                setIsDialogOpen(false);
            }
        } else {
            alert("Não é possível deletar. O serviço não está em modo de edição ou ID inválido.");
        }
    };

    const loadServiceForEdit = async (contractedServiceId) => {
        try {
            const contractedServiceResponse = await axios.get(`${BASE_URL}/api/contracted-services/${contractedServiceId}`);
            // .then(console.log(contractedServiceResponse));
            const contractedService = contractedServiceResponse.data;

            setAmount(contractedService.amount);
            setDate(new Date(contractedService.date).toISOString().split('T')[0]);
            setDescription(contractedService.description);
            setNumInstallment(contractedService.num_installments);
            setOriginalNumInstallments(contractedService.num_installments);
            setPaid(contractedService.paid);
            setEmployeeId(contractedService.employee_id);
            setEmployeeIdInput(contractedService.employee_id);
            setWorkId(contractedService.work_id);
            setWorkIdInput(contractedService.work_id);
        } catch (error) {
            console.error('Erro ao carregar contractedService para edição:', error);
        }
    };

    const handleEmployeeChange = (e) => {
        const selectedEmployeeId = parseInt(e.target.value, 10); // Converte para número
        setEmployeeId(selectedEmployeeId);
        setEmployeeIdInput(selectedEmployeeId.toString());
    }

    const handleEmployeeIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0; // Converte para número ou 0 se inválido
        setEmployeeId(inputId);
        setEmployeeIdInput(inputId.toString());
    };

    const handleWorkChange = (e) => {
        const selectedWorkId = parseInt(e.target.value, 10); // Converte para número
        setWorkId(selectedWorkId);
        setWorkIdInput(selectedWorkId.toString());
    }

    const handleWorkIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0; // Converte para número ou 0 se inválido
        setWorkId(inputId);
        setWorkIdInput(inputId.toString());
    };

    return (
        <Layout>
        <div className='body'>
            <div className='select-id'>
                    <input
                        placeholder='ID'
                        value={employeeIdInput}
                        onChange={handleEmployeeIdInputChange}
                    />
                    <select value={employeeId} onChange={handleEmployeeChange}>
                        <option value={0} disabled>
                            Selecione um Contratado
                        </option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                </div>

            <div className='select-id'>
                    <input
                        placeholder='ID'
                        value={workIdInput}
                        onChange={handleWorkIdInputChange}
                    />
                    <select value={workId} onChange={handleWorkChange}>
                        <option value={0} disabled>
                            Selecione uma Obra
                        </option>
                        {works.map((work) => (
                            <option key={work.id} value={work.id}>
                                {work.name}
                            </option>
                        ))}
                    </select>
                </div>

            <div className='field'>
                <label>Preço:</label>
                <input value={amount} type='number' onChange={e => setAmount(e.target.value)}/>
            </div>
            <div className='field'>
                <label>Data:</label>
                <input type='date' value={date} onChange={e => setDate(e.target.value)}/>
            </div>
            <div className='field'>
                <label>Descrição:</label>
                <input type='text' value={description} onChange={e => setDescription(e.target.value)}/>
            </div>
            <div className='field'>
                <label>Número de Parcelas:</label>
                <input type='number' min={1} value={numInstallments} onChange={e => setNumInstallment(e.target.value)}/>
            </div>

            <div className='field'>
                <label>Pago:</label>
                <input id='checkbox' type='checkbox' checked={paid} onChange={(e) => setPaid(e.target.checked)}/>
                <label htmlFor="checkbox" className="checkbox-custom"></label>
            </div>

            <div className='field'>
                <button onClick={handleConfirm2} disabled={!filledFields}>
                    {isEditing ? 'Salvar Alterações' : 'Confirmar'}
                </button>
            </div>

            <div>
            {isEditing && (
                <div className="field">
                    <button onClick={() => setIsDialogOpen(true)}>
                        Deletar
                    </button>
                </div>
            )}

            {/* Popup de confirmação */}
            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDelete}
                message="Tem certeza de que deseja deletar este serviço? (O saldo será atualizado)"
            />
        </div>
        </div>
        </Layout>
    );
}

export default ContractedServiceDetails;