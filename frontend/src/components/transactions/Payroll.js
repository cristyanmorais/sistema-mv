import axios from 'axios';
import React, { useEffect, useState } from 'react'
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

const Payroll = () => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        const amountNumber = parseFloat(amount);

        if (amountNumber > 0 && date !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

    }, [amount, date]);

    const clearFields = () => {
        setAmount('');
        setDate('');
    }

    const handleConfirm = () => {
        const data = {
            amount: Number(amount),
            payroll_date: date,
        }

        const sendTaxesData = (data) => {
            return axios.post('http://localhost:3000/api/payroll', data);
        };
        
        const sendOtherData = (otherData) => {
            return axios.post('http://localhost:3000/api/cash-register', otherData);
        };
        
        sendTaxesData(data)
            .then(response => {
                console.log("Data successfully sent: ", response.data);

                const otherData = {
                    transaction_type: "taxes",
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
            <div>
                <label>Preço:</label>
                <input value={amount} type='number' onChange={e => setAmount(e.target.value)}/>
            </div>
            <div>
                <label>Data:</label>
                <input type='date' value={date} onChange={e => setDate(e.target.value)}/>
            </div>

            <div>
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export default Payroll;