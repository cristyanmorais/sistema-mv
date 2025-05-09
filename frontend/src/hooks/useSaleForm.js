import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const useSaleForm = (mode, id = null) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        work_id: 0,
        amount: '',
        date: '',
        description: '',
        num_installments: 1,
        paid: false
    });
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [workIdInput, setWorkIdInput] = useState('');
    const [originalNumInstallments, setOriginalNumInstallments] = useState('');

    useEffect(() => {
        loadWorks();
        if (mode === 'edit' && id) {
            loadSaleData(id);
        }
    }, [mode, id]);

    const loadWorks = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/works`);
            setWorks(response.data);
        } catch (error) {
            setError('Erro ao carregar lista de obras');
            console.error('Erro ao carregar obras:', error);
        }
    };

    const loadSaleData = async (Id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/sales/${Id}`);
            const sale = response.data;

            setFormData({
                work_id: sale.work_id,
                amount: sale.amount,
                date: new Date(sale.date).toISOString().split('T')[0],
                description: sale.description,
                num_installments: sale.num_installments,
                paid: sale.paid
            });
            setOriginalNumInstallments(sale.num_installments);
            setWorkIdInput(sale.work_id.toString());
        } catch (error) {
            setError('Erro ao carregar dados da venda');
            console.error('Erro ao carregar venda:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            
            const saleData = {
                work_id: formData.work_id,
                amount: Number(formData.amount),
                date: formData.date,
                description: formData.description,
                num_installments: formData.num_installments,
                paid: formData.paid,
                num_installments_changed: originalNumInstallments !== formData.num_installments
            };

            if (mode === 'create') {
                await axios.post(`${BASE_URL}/api/sales`, saleData);
            } else {
                await axios.put(`${BASE_URL}/api/sales/${id}`, saleData);
            }

            navigate('/sales');
        } catch (error) {
            setError('Erro ao salvar venda');
            console.error('Erro ao salvar venda:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.put(`${BASE_URL}/api/sales/${id}/delete`);
            navigate('/sales');
        } catch (error) {
            setError('Erro ao deletar venda');
            console.error('Erro ao deletar venda:', error);
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

    const handleWorkChange = (e) => {
        const selectedWorkId = parseInt(e.target.value, 10);
        setFormData(prev => ({
            ...prev,
            work_id: selectedWorkId
        }));
        setWorkIdInput(selectedWorkId.toString());
    };

    const handleWorkIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0;
        setFormData(prev => ({
            ...prev,
            work_id: inputId
        }));
        setWorkIdInput(inputId.toString());
    };

    return {
        formData,
        works,
        loading,
        error,
        workIdInput,
        handleSubmit,
        handleDelete,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleWorkChange,
        handleWorkIdInputChange,
    };
}; 