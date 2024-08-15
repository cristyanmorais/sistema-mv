import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Body } from '../Teste';

const Purchases = () => {
    const [companyId, setCompanyId] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [numInstallments, setNumInstallment] = useState(1);
    const [paid, setPaid] = useState(false);

    const [companies, setCompanies] = useState([]);

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/companies')
        .then(response => setCompanies(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {

        if (companyId > 0 && amount > 0 && date !== '' && description !== '' && numInstallments > 0) {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

    }, [companyId, amount, date, description, numInstallments])

    const handleCompanyChange = (e) => {
        setCompanyId(e.target.value);
    }

    const clearFields = () => {
        setCompanyId(0);
        setAmount('');
        setDate('');
        setDescription('');
        setNumInstallment(1);
    }

    const handleConfirm = () => {
            const data = {
                company_id: companyId,
                amount: Number(amount),
                purchase_date: date,
                description,
                num_installments: numInstallments,
                paid
            }
            
            axios.post('http://localhost:3000/api/purchases', data)
            .then(response => {
                console.log("Data succefully sent: ", response.data);

                if (numInstallments > 0) handleInstallment(response.data.id);

                clearFields();
            })
            .catch(error => {
                console.error("Error while sending data: ", error);
            })
    }

    const handleInstallment = (purchaseId) => {
        const data = {
            transaction_id: purchaseId,
            transaction_type: 'purchases',
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

export default Purchases;