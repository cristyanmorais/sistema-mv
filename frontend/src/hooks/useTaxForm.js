import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const useTaxForm = (mode, id = null) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        taxes_type_id: 0,
        amount: '',
        date: '',
        description: '',
        num_installments: 1,
        paid: false
    });
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [typeIdInput, setTypeIdInput] = useState('');
    const [originalNumInstallments, setOriginalNumInstallments] = useState('');

    useEffect(() => {
        loadTypes();
        if (mode === 'edit' && id) {
            loadTaxData(id);
        }
    }, [mode, id]);

    const loadTypes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/taxes-type`);
            setTypes(response.data);
        } catch (error) {
            setError('Erro ao carregar tipos de imposto');
            console.error('Erro ao carregar tipos de imposto:', error);
        }
    };

    const loadTaxData = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/taxes/${id}`);
            const tax = response.data;
            console.log('Tax data:', tax);

            setFormData({
                taxes_type_id: tax.taxes_type_id,
                amount: tax.amount,
                date: new Date(tax.date).toISOString().split('T')[0],
                description: tax.description,
                num_installments: tax.num_installments,
                paid: tax.paid
            });
            setOriginalNumInstallments(tax.num_installments);
            setTypeIdInput(tax.taxes_type_id.toString());
        } catch (error) {
            setError('Erro ao carregar dados do imposto');
            console.error('Erro ao carregar dados do imposto:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            
            const taxData = {
                taxes_type_id: formData.taxes_type_id,
                amount: Number(formData.amount),
                date: formData.date,
                description: formData.description,
                num_installments: formData.num_installments,
                paid: formData.paid,
                num_installments_changed: originalNumInstallments !== formData.num_installments
            };

            if (mode === 'create') {
                await axios.post(`${BASE_URL}/api/taxes`, taxData);
            } else {
                await axios.put(`${BASE_URL}/api/taxes/${id}`, taxData);
            }

            navigate('/taxes');
        } catch (error) {
            setError('Erro ao salvar imposto');
            console.error('Erro ao salvar imposto:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.put(`${BASE_URL}/api/taxes/${id}/delete`);
            navigate('/taxes');
        } catch (error) {
            setError('Erro ao deletar imposto');
            console.error('Erro ao deletar imposto:', error);
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

    const handleTypeChange = (e) => {
        const selectedTypeId = parseInt(e.target.value, 10);
        setFormData(prev => ({
            ...prev,
            taxes_type_id: selectedTypeId
        }));
        setTypeIdInput(selectedTypeId.toString());
    };

    const handleTypeIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0;
        setFormData(prev => ({
            ...prev,
            taxes_type_id: inputId
        }));
        setTypeIdInput(inputId.toString());
    };

    return {
        formData,
        types,
        loading,
        error,
        typeIdInput,
        handleSubmit,
        handleDelete,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleTypeChange,
        handleTypeIdInputChange,
    };
}; 