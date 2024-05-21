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

const Taxes = () => {
    const [taxTypeId, setTaxTypeId] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const [taxTypes, setTaxTypes] = useState([]);

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/taxes-type')
        .then(response => setTaxTypes(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        const amountNumber = parseFloat(amount);

        if (taxTypeId > 0 && amount > 0 && date !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

    }, [taxTypeId, amount, date])

    const handleTaxTypeChange = (e) => {
        setTaxTypeId(e.target.value);
    }

    const clearFields = () => {
        setTaxTypeId(0);
        setAmount('');
        setDate('');
    }

    const handleConfirm = () => {
            const data = {
                taxes_type_id: taxTypeId,
                amount: Number(amount),
                tax_date: date,
            }
            
            axios.post('http://localhost:3000/api/taxes', data)
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
                <label>Tipo de imposto:</label>
                <select value={taxTypeId} onChange={handleTaxTypeChange}>
                    <option value={0} disabled>Selecione uma obra</option>
                    {taxTypes.map(taxType => (
                        <option key={taxType.id} value={taxType.id}>
                            {taxType.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Preço:</label>
                <input key="random1" value={amount} type='number' onChange={e => setAmount(e.target.value)}/>
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

export default Taxes;