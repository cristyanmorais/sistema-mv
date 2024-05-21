import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// CSS
const Body = styled.div`
        background-color: lightgreen;
        width: 1000px;
        margin: auto;
        margin-top: 50px;

        display: flex;
        flex-direction: column;
    `;

const Sales = () => {
    const [workId, setWorkId] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [installment, setInstallment] = useState(false);

    const [works, setWorks] = useState([]);

    const [installmentDate, setInstallmentDate] = useState('');
    const [installmentAmount, setInstallmentAmount] = useState('');

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/works')
        .then(response => setWorks(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        const amountNumber = parseFloat(amount);
        const installmentAmountNumber = parseFloat(installmentAmount);

        if (installment) {
            if (workId > 0 && amountNumber > 0 && date !== '' && installmentDate !== '' && installmentAmountNumber < amountNumber && installmentAmountNumber > 0) {
                setFilledFields(true);
            } else {
                setFilledFields(false);
            }
        } else {
            if (workId > 0 && amount > 0 && date !== '') {
                setFilledFields(true);
            } else {
                setFilledFields(false);
            }
        }

    }, [workId, amount, date, installment, installmentDate, installmentAmount])

    const checkHandler = () => {
        setInstallment(!installment);
    };

    const handleWorkChange = (e) => {
        setWorkId(e.target.value);
    }

    const clearFields = () => {
        setWorkId(0);
        setAmount('');
        setDate('');
        setInstallment(false);
        setInstallmentAmount('');
        setInstallmentDate('');
    }

    const handleConfirm = () => {
            const data = {
                work_id: workId,
                amount: Number(amount),
                sale_date: date,
                is_installment: installment
            }
            
            axios.post('http://localhost:3000/api/sales', data)
            .then(response => {
                console.log("Data succefully sent: ", response.data);

                if (installment) handleInstallment(response.data.id);

                clearFields();
            })
            .catch(error => {
                console.error("Error while sending data: ", error);
            })
    }

    const handleInstallment = (saleId) => {
        const data = {
            sale_id: saleId,
            installment_amount: Number(installmentAmount),
            due_date: installmentDate,
            paid: false
        }

        axios.post('http://localhost:3000/api/sales-installments', data)
        .then(response => {
            console.log("Data succefully sent: ", response.data);
        })
        .catch(error => {
            console.error("Error while sending data: ", error);
        })
    }

    return (
        <Body>
            <div>
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
            <div>
                <label>Preço:</label>
                <input key="random1" value={amount} type='number' onChange={e => setAmount(e.target.value)}/>
            </div>
            <div>
                <label>Data:</label>
                <input type='date' value={date} onChange={e => setDate(e.target.value)}/>
            </div>
            <div>
                <label>Parcelado:</label>
                <input type='checkbox' checked={installment} onChange={e => checkHandler()}/>
            </div>

            {installment ? 
            <div>
                <div>
                    <label>Data da primeira parcela:</label>
                    <input type='date' value={installmentDate} onChange={e => setInstallmentDate(e.target.value)}/>
                </div>
                <div>
                    <label>Valor da primeira parcela:</label>
                    <input type='number' value={installmentAmount} onChange={e => setInstallmentAmount(e.target.value)}/>
                </div>
            </div> 
            : null}

            <div>
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export default Sales;