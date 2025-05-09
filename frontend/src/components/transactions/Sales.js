import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Body } from '../Teste';

const Sales = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const [workId, setWorkId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [numInstallments, setNumInstallment] = useState(1);
    const [paid, setPaid] = useState(false);

    const [works, setWorks] = useState([]);

    const [filledFields, setFilledFields] = useState(false);

    const [workIdInput, setWorkIdInput] = useState('');

    useEffect(() => {
        axios.get(`${BASE_URL}/api/works`)
        .then(response => setWorks(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        if (numInstallments < 1) setNumInstallment(1);
    }, [numInstallments]);

    useEffect(() => {

        if (workId > 0 && amount > 0 && date !== '' && description !== '' && numInstallments > 0) {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

    }, [workId, amount, date, description, numInstallments])

    const handleWorkChange = (e) => {
        const selectedWorkId = parseInt(e.target.value, 10); // Converte para número
        setWorkId(selectedWorkId);
        setWorkIdInput(selectedWorkId.toString()); // Sincroniza o campo de input de ID
    };
    
    const handleWorkIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0; // Converte para número ou 0 se inválido
        setWorkId(inputId);
        setWorkIdInput(inputId.toString());
    };

    const clearFields = () => {
        setWorkId(0);
        setAmount('');
        setDate('');
        setDescription('');
        setNumInstallment(1);
        setPaid(false);
    }

    const handleConfirm = () => {
        const data = {
            work_id: workId,
            amount: Number(amount),
            date,
            description,
            num_installments: Number(numInstallments),
            paid
        }

        const sendSalesData = (data) => {
            return axios.post(`${BASE_URL}/api/sales`, data)
        };
        
        const sendCashRegisterData = (cashRegisterData) => {
            return axios.post(`${BASE_URL}/api/cash-register`, cashRegisterData);
        };

        const handleInstallment = (saleId) => {
            const installmentData = {
                transaction_id: saleId,
                transaction_type: 'sales',
                installment_amount: amount / numInstallments,
                due_date: date,
                paid
            };
        
            let dueDate = new Date(date); // Cria a data inicial a partir do valor selecionado
        
            for (let i = 0; i < numInstallments; i++) {
                if (i > 0) {
                    // A partir do segundo installment, adiciona 30 dias à data
                    dueDate.setDate(dueDate.getDate() + 30);
                }
        
                // Formata a nova data no formato YYYY-MM-DD
                const newDueDate = dueDate.toISOString().split('T')[0];
                installmentData.due_date = newDueDate;
        
                console.log(`Installment ${i + 1} due date: ${newDueDate}`);
        
                // Envia os dados da parcela para a API
                axios.post(`${BASE_URL}/api/installments`, installmentData)
                    .then(response => {
                        console.log(`Installment ${i + 1} successfully created: `, response.data);
                    })
                    .catch(error => {
                        console.error(`Error while sending Installment ${i + 1}: `, error);
                    });
            }
        };
        
        

        sendSalesData(data)
            .then(response => {
                console.log("Sale successfully created: ", response.data);

                const cashRegisterData = {
                    transaction_type: "sales",
                    transaction_id: response.data.id,
                    transaction_date: date,
                    amount: Number(amount)
                }

                if (paid === true) {
                    if (numInstallments > 1) {
                        cashRegisterData.amount = amount/numInstallments;
                        handleInstallment(response.data.id);
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

    return (
        <Body>
            <div className='field'>
                <label>Obra:</label>
                <div className='select-id'>
                    <input
                        // type='number'
                        placeholder='ID'
                        value={workIdInput}
                        onChange={handleWorkIdInputChange}
                    />
                    <select value={workId} onChange={handleWorkChange}>
                        <option value={0} disabled>Selecione uma obra</option>
                        {works.map(work => (
                            <option key={work.id} value={work.id}>
                                {work.name}
                            </option>
                        ))}
                    </select>
                </div>
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

export default Sales;