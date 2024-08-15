import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Body } from '../Teste';
import Installment from '../InstallmentField';

const ContractedServices = () => {
    const [employeeId, setEmployeeId] = useState(0);
    const [workId, setWorkId] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [numInstallments, setNumInstallment] = useState(1);
    const [paid, setPaid] = useState(false);

    const [employees, setEmployees] = useState([]);
    const [works, setWorks] = useState([]);

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/employees')
        .then(response => setEmployees(response.data))
        .catch(error => console.error('Error: ', error));

        axios.get('http://localhost:3000/api/works')
        .then(response => setWorks(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {

        if (employeeId > 0 && workId > 0 && amount > 0 && date !== '' && description !== '' && numInstallments > 0) {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

    }, [employeeId, workId, amount, date, description, numInstallments]);

    const handleEmployeeChange = (e) => {
        setEmployeeId(e.target.value);
    }

    const handleWorkChange = (e) => {
        setWorkId(e.target.value);
    }

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
            service_date: date,
            description,
            num_installments: numInstallments,
            paid
        }
        
        const sendContractedServiceData = (data) => {
            return axios.post('http://localhost:3000/api/contracted-services', data);
        };
        
        const sendCashRegisterData = (cashRegisterData) => {
            return axios.post('http://localhost:3000/api/cash-register', cashRegisterData);
        };

        const handleInstallment = (contractedServiceId) => {
            const data = {
                transaction_id: contractedServiceId,
                transaction_type: 'contracted-services',
                installment_amount: amount/numInstallments,
                due_date: "2024-01-01",
                paid
            }
    
            axios.post('http://localhost:3000/api/installments', data)
            .then(response => {
                console.log("Installment succefully created: ", response.data);
            })
            .catch(error => {
                console.error("Error while sending Installment: ", error);
            })
        }
        
        sendContractedServiceData(data)
            .then(response => {
                console.log("Data successfully sent: ", response.data);

                const cashRegisterData = {
                    transaction_type: "contracted-services",
                    transaction_id: response.data.id,
                    transaction_date: date,
                    amount: Number(amount)
                }
        
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
                }
            })
    }

    return (
        <Body>
            <div className='field'>
                <label>Selecione um contratado:</label>
                <select value={employeeId} onChange={handleEmployeeChange}>
                    <option value={0} disabled>Selecione um contratado:</option>
                    {employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='field'>
                <label>Obra:</label>
                <select value={workId} onChange={handleWorkChange}>
                    <option value={0} disabled>Selecione uma obra</option>
                    {works.map(work => (
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
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export default ContractedServices;