import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Body } from '../Teste';

const Taxes = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const [taxTypeId, setTaxTypeId] = useState(0);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [numInstallments, setNumInstallment] = useState(1);
    const [paid, setPaid] = useState(false);

    const [taxTypes, setTaxTypes] = useState([]);

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/taxes-type`)
        .then(response => setTaxTypes(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        
        if (taxTypeId > 0 && amount > 0 && date !== '' && description !== '' && numInstallments > 0) {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }

    }, [taxTypeId, amount, date, description, numInstallments]);

    const handleTaxTypeChange = (e) => {
        setTaxTypeId(e.target.value);
    }

    const clearFields = () => {
        console.log("clearFields");
        setTaxTypeId(0);
        setAmount('');
        setDate('');
        setDescription('');
        setNumInstallment(1);
        setPaid(false);
    }

    const handleConfirm = () => {
            const data = {
                taxes_type_id: taxTypeId,
                amount: Number(amount),
                date,
                description,
                num_installments: numInstallments,
                paid
            }
            
            const sendTaxesData = (data) => {
                return axios.post(`${BASE_URL}/api/taxes`, data);
            };
            
            const sendCashRegisterData = (cashRegisterData) => {
                return axios.post(`${BASE_URL}/api/cash-register`, cashRegisterData);
            };

            const handleInstallment = (taxId) => {
                const installmentData = {
                    transaction_id: taxId,
                    transaction_type: 'taxes',
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
            
            sendTaxesData(data)
                .then(response => {
                    console.log("Data successfully sent: ", response.data);

                    const cashRegisterData = {
                        transaction_type: "taxes",
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
                <label>Tipo de imposto:</label>
                <select value={taxTypeId} onChange={handleTaxTypeChange}>
                    <option value={0} disabled>Selecione o tipo</option>
                    {taxTypes.map(taxType => (
                        <option key={taxType.id} value={taxType.id}>
                            {taxType.name}
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

export default Taxes;