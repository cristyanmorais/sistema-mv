import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Body } from '../Teste';

const Sales = () => {
    const [workId, setWorkId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [numInstallments, setNumInstallment] = useState(1);
    const [paid, setPaid] = useState(false);

    const [works, setWorks] = useState([]);

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/works')
        .then(response => setWorks(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {

        if (workId > 0 && amount > 0 && date !== '' && description !== '' && numInstallments > 0) {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

    }, [workId, amount, date, description, numInstallments])

    const handleWorkChange = (e) => {
        setWorkId(e.target.value);
    }

    const clearFields = () => {
        setWorkId(0);
        setAmount('');
        setDate('');
        setDescription('');
        setNumInstallment(1);
    }

    const handleConfirm = () => {
            const data = {
                work_id: workId,
                amount: Number(amount),
                sale_date: date,
                description,
                num_installments: numInstallments,
                paid
            }
            
            axios.post('http://localhost:3000/api/sales', data)
            .then(response => {
                console.log("Data succefully sent: ", response.data);

                if (numInstallments > 0) handleInstallment(response.data.id);

                clearFields();
            })
            .catch(error => {
                console.error("Error while sending data: ", error);
            })
    }

    const handleInstallment = (saleId) => {
        const data = {
            transaction_id: saleId,
            transaction_type: 'sales',
            installment_amount: amount/numInstallments,
            due_date: "2024-01-01",
            paid
        }

        axios.post('http://localhost:3000/api/installments', data)
        .then(response => {
            console.log("Data succefully sent: ", response.data);
        })
        .catch(error => {
            console.error("Error while sending data: ", error);
        })
    }

    return (
        <Body>
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
                <input type='number' value={numInstallments} onChange={e => setNumInstallment(e.target.value)}/>
            </div>

            <div className='field'>
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export default Sales;