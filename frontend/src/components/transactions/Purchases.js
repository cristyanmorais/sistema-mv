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

const Purchases = () => {
    const [companyId, setCompanyId] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [installment, setInstallment] = useState(false);

    const [companies, setCompanies] = useState([]);

    const [installmentDate, setInstallmentDate] = useState('');
    const [installmentAmount, setInstallmentAmount] = useState('');

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/companies')
        .then(response => setCompanies(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        const amountNumber = parseFloat(amount);
        const installmentAmountNumber = parseFloat(installmentAmount);

        if (installment) {
            if (companyId > 0 && amountNumber > 0 && date !== '' && description !== '' && installmentDate !== '' && installmentAmountNumber < amountNumber && installmentAmountNumber > 0) {
                setFilledFields(true);
            } else {
                setFilledFields(false);
            }
        } else {
            if (companyId > 0 && amount > 0 && date !== '' && description !== '') {
                setFilledFields(true);
            } else {
                setFilledFields(false);
            }
        }

    }, [companyId, amount, date, installment, installmentDate, installmentAmount, description])

    const checkHandler = () => {
        setInstallment(!installment);
    };

    const handleCompanyChange = (e) => {
        setCompanyId(e.target.value);
    }

    const clearFields = () => {
        setCompanyId(0);
        setAmount('');
        setDate('');
        setInstallment(false);
        setInstallmentAmount('');
        setInstallmentDate('');
    }

    const handleConfirm = () => {
            const data = {
                company_id: companyId,
                amount: Number(amount),
                purchase_date: date,
                is_installment: installment
            }
            
            axios.post('http://localhost:3000/api/purchases', data)
            .then(response => {
                console.log("Data succefully sent: ", response.data);

                if (installment) handleInstallment(response.data.id);

                clearFields();
            })
            .catch(error => {
                console.error("Error while sending data: ", error);
            })
    }

    const handleInstallment = (purchaseId) => {
        const data = {
            purchase_id: purchaseId,
            installment_amount: Number(installmentAmount),
            due_date: installmentDate,
            paid: false
        }

        axios.post('http://localhost:3000/api/purchases-installments', data)
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
                <label>Empresa:</label>
                <select value={companyId} onChange={handleCompanyChange}>
                    <option value={0} disabled>Selecione uma empresa</option>
                    {companies.map(company => (
                        <option key={company.id} value={company.id}>
                            {company.fantasy_name}
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
                <label>Descrição:</label>
                <input type='text' value={description} onChange={e => setDescription(e.target.value)}/>
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

export default Purchases;