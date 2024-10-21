import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Body } from '../Teste';

const ProvidedServices = () => {
    const [clientId, setClientId] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [numInstallments, setNumInstallment] = useState(1);
    const [paid, setPaid] = useState(false);

    const [clients, setClients] = useState([]);

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/clients')
        .then(response => setClients(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        if (numInstallments < 1) setNumInstallment(1);
    }, [numInstallments]);

    useEffect(() => {
        
        if (clientId > 0 && amount > 0 && date !== '' && description !== '' && numInstallments > 0) {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

    }, [clientId, amount, date, description, numInstallments]);

    const handleClientChange = (e) => {
        setClientId(e.target.value);
    }

    const clearFields = () => {
        setClientId(0);
        setAmount('');
        setDate('');
        setDescription('');
        setNumInstallment(1);
        setPaid(false);
    }

    const handleConfirm = () => {
        const data = {
            client_id: clientId,
            amount: Number(amount),
            service_date: date,
            description,
            num_installments: numInstallments,
            paid
        }

        const sendProvidedServicesData = (data) => {
            return axios.post('http://localhost:3000/api/provided-services', data);
        };
        
        const sendCashRegisterData = (cashRegisterData) => {
            return axios.post('http://localhost:3000/api/cash-register', cashRegisterData);
        };

        const handleInstallment = (ProvidedServicesId) => {
            const installmentData = {
                transaction_id: ProvidedServicesId,
                transaction_type: 'provided-services',
                installment_amount: amount/numInstallments,
                due_date: date,
                paid
            }

            const originalYear = parseInt(date.substring(0, 4));
            const originalMonth = parseInt(date.substring(5, 7));

            for (let i = 0; i < numInstallments; i++) {
                const newMonth = ((originalMonth + i - 1) % 12) + 1;
                const newYear = originalYear + Math.floor((originalMonth + i - 1) / 12);
                const formattedMonth = newMonth.toString().padStart(2, '0');
                
                installmentData.due_date = `${newYear}-${formattedMonth}${date.substring(7)}`;
                console.log(installmentData.due_date);

                axios.post('http://localhost:3000/api/installments', installmentData)
                .then(response => {
                    console.log("Installment " + (i + 1) + " succefully created: ", response.data);
                })
                .catch(error => {
                    console.error("Error while sending Installment " + (i + 1) + ": ", error);
                })
            }
        }
        
        sendProvidedServicesData(data)
            .then(response => {
                console.log("Data successfully sent: ", response.data);

                const cashRegisterData = {
                    transaction_type: "provided-services",
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
                <label>Selecione um cliente:</label>
                <select value={clientId} onChange={handleClientChange}>
                    <option value={0} disabled>Selecione um cliente:</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>
                            {client.name}
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

export default ProvidedServices;