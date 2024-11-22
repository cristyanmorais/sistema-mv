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
        axios.get(`${BASE_URL}/api/companies`)
        .then(response => setCompanies(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        if (numInstallments < 1) setNumInstallment(1);
    }, [numInstallments]);

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
        setPaid(false);
    }

    const handleConfirm = () => {
            const data = {
                company_id: companyId,
                amount: Number(amount),
                date,
                description,
                num_installments: Number(numInstallments),
                paid
            }
            
            const sendPurchasesData = (data) => {
                return axios.post(`${BASE_URL}/api/purchases`, data)
            };
            
            const sendCashRegisterData = (cashRegisterData) => {
                return axios.post(`${BASE_URL}/api/cash-register`, cashRegisterData);
            };
    
            const handleInstallment = (purchaseId) => {
                const installmentData = {
                    transaction_id: purchaseId,
                    transaction_type: 'purchases',
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
    
            sendPurchasesData(data)
                .then(response => {
                    console.log("purchase successfully created: ", response.data);
    
                    const cashRegisterData = {
                        transaction_type: "purchases",
                        transaction_id: response.data.id,
                        transaction_date: date,
                        amount: Number(amount)
                    }
    
                    if (paid === true) {
                        if (numInstallments > 1) {
                            handleInstallment(response.data.id);
                            cashRegisterData.amount = amount/numInstallments;
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

export default Purchases;