import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Body } from '../Teste';
import Installment from '../InstallmentField';

const ContractedServices = () => {
    const [employeeId, setEmployeeId] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [installment, setInstallment] = useState(false);

    const [employees, setEmployees] = useState([]);

    const [installmentDate, setInstallmentDate] = useState('');
    const [installmentAmount, setInstallmentAmount] = useState('');
    const [installmentNumber, setInstallmentNumber] = useState('');

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/employees')
        .then(response => setEmployees(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        const amountNumber = parseFloat(amount);

        if (employeeId > 0 && amountNumber > 0 && date !== '' && description !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

    }, [employeeId, amount, date, description]);

    const handleEmployeeChange = (e) => {
        setEmployeeId(e.target.value);
    }

    const clearFields = () => {
        setEmployeeId(0);
        setAmount('');
        setDate('');
        setDescription('');
    }

    const handleConfirm = () => {
        const data = {
            employee_id: employeeId,
            amount: Number(amount),
            service_date: date,
            description
        }
        
        const sendContractedServiceData = (data) => {
            return axios.post('http://localhost:3000/api/contracted-services', data);
        };
        
        const sendCashRegisterData = (cashRegisterData) => {
            return axios.post('http://localhost:3000/api/cash-register', cashRegisterData);
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
        
                // Chama a segunda função axios aqui
                return sendCashRegisterData(cashRegisterData);
            })
            .then(response => {
                console.log("Second request successfully sent: ", response.data);
        
                clearFields();
            })
            .catch(error => {
                console.error("Error while sending data: ", error);
            });
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
            
            <Installment
                setInstallmentDate={setInstallmentDate}
                setInstallmentAmount={setInstallmentAmount}
                setInstallmentNumber={setInstallmentNumber}
            />

            <div className='field'>
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export default ContractedServices;