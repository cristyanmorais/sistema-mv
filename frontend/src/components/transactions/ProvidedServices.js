import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Body } from '../Teste';

const ProvidedServices = () => {
    const [clientId, setClientId] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [clients, setClients] = useState([]);

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/clients')
        .then(response => setClients(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        const amountNumber = parseFloat(amount);

        if (clientId > 0 && amountNumber > 0 && date !== '' && description !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

    }, [clientId, amount, date, description]);

    const handleClientChange = (e) => {
        setClientId(e.target.value);
    }

    const clearFields = () => {
        setClientId(0);
        setAmount('');
        setDate('');
        setDescription('');
    }

    const handleConfirm = () => {
        const data = {
            client_id: clientId,
            amount: Number(amount),
            service_date: date,
            description
        }

        const sendTaxesData = (data) => {
            return axios.post('http://localhost:3000/api/provided-services', data);
        };
        
        const sendOtherData = (otherData) => {
            return axios.post('http://localhost:3000/api/cash-register', otherData);
        };
        
        sendTaxesData(data)
            .then(response => {
                console.log("Data successfully sent: ", response.data);

                const otherData = {
                    transaction_type: "provided_services",
                    transaction_id: response.data.id,
                    transaction_date: date,
                    amount: Number(amount)
                }
        
                // Chama a segunda função axios aqui
                return sendOtherData(otherData);
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
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export default ProvidedServices;