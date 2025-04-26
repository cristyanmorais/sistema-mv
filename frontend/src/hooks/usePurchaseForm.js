import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const usePurchaseForm = (mode, id = null) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company_id: 0,
        amount: '',
        date: '',
        description: '',
        num_installments: 1,
        paid: false
    });
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [companyIdInput, setCompanyIdInput] = useState('');
    const [originalNumInstallments, setOriginalNumInstallments] = useState('');

    useEffect(() => {
        loadCompanies();
        if (mode === 'edit' && id) {
            loadPurchaseData(id);
        }
    }, [mode, id]);

    const loadCompanies = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/companies`);
            setCompanies(response.data);
        } catch (error) {
            setError('Erro ao carregar lista de empresas');
            console.error('Erro ao carregar empresas:', error);
        }
    };

    const loadPurchaseData = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/purchases/${id}`);
            const purchase = response.data;

            setFormData({
                company_id: purchase.company_id,
                amount: purchase.amount,
                date: new Date(purchase.date).toISOString().split('T')[0],
                description: purchase.description,
                num_installments: purchase.num_installments,
                paid: purchase.paid
            });
            setOriginalNumInstallments(purchase.num_installments);
            setCompanyIdInput(purchase.company_id.toString());
        } catch (error) {
            setError('Erro ao carregar dados do compra');
            console.error('Erro ao carregar compra:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            
            const purchaseData = {
                company_id: formData.company_id,
                amount: Number(formData.amount),
                date: formData.date,
                description: formData.description,
                num_installments: formData.num_installments,
                paid: formData.paid,
                num_installments_changed: originalNumInstallments !== formData.num_installments
            };

            if (mode === 'create') {
                await axios.post(`${BASE_URL}/api/purchases`, purchaseData);
            } else {
                await axios.put(`${BASE_URL}/api/purchases/${id}`, purchaseData);
            }

            navigate('/purchases');
        } catch (error) {
            setError('Erro ao salvar compra');
            console.error('Erro ao salvar compra:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.put(`${BASE_URL}/api/purchases/${id}/delete`);
            navigate('/purchases');
        } catch (error) {
            setError('Erro ao deletar compra');
            console.error('Erro ao deletar compra:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAmountChange = (value) => {
        setFormData(prev => ({
            ...prev,
            amount: value
        }));
    };

    const handleNumInstallmentsChange = (value) => {
        setFormData(prev => ({
            ...prev,
            num_installments: value
        }));
    };

    const handlePaidChange = (value) => {
        setFormData(prev => ({
            ...prev,
            paid: value
        }));
    };

    const handleCompanyChange = (e) => {
        const selectedCompanyId = parseInt(e.target.value, 10);
        setFormData(prev => ({
            ...prev,
            company_id: selectedCompanyId
        }));
        setCompanyIdInput(selectedCompanyId.toString());
    };

    const handleCompanyIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0;
        setFormData(prev => ({
            ...prev,
            company_id: inputId
        }));
        setCompanyIdInput(inputId.toString());
    };

    return {
        formData,
        companies,
        loading,
        error,
        companyIdInput,
        handleSubmit,
        handleDelete,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleCompanyChange,
        handleCompanyIdInputChange,
    };
}; 