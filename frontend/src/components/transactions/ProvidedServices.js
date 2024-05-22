import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// CSS
const Body = styled.div`
        background-color: lightgreen;
        width: 1000px;
        margin: auto;
        margin-top: 50px;

        display: flex;
        flex-direction: column;
    `;

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
        
        axios.post('http://localhost:3000/api/provided-services', data)
        .then(response => {
            console.log("Data succefully sent: ", response.data);

            clearFields();
        })
        .catch(error => {
            console.error("Error while sending data: ", error);
        })
    }

    return (
        <Body>
            <div>
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
            <div>
                <label>Preço:</label>
                <input value={amount} type='number' onChange={e => setAmount(e.target.value)}/>
            </div>
            <div>
                <label>Data:</label>
                <input type='date' value={date} onChange={e => setDate(e.target.value)}/>
            </div>
            <div>
                <label>Descrição:</label>
                <input type='text' value={description} onChange={e => setDescription(e.target.value)}/>
            </div>

            <div>
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export default ProvidedServices;