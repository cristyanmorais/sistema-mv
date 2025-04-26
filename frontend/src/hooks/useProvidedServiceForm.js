import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const useProvidedServiceForm = (mode, id = null) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        client_id: 0,
        amount: '',
        date: '',
        description: '',
        num_installments: 1,
        paid: false
    });
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [clientIdInput, setClientIdInput] = useState('');
    const [originalNumInstallments, setOriginalNumInstallments] = useState('');

    useEffect(() => {
        loadClients();
        if (mode === 'edit' && id) {
            loadServiceData(id);
        }
    }, [mode, id]);

    const loadClients = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/clients`);
            setClients(response.data);
        } catch (error) {
            setError('Erro ao carregar lista de clientes');
            console.error('Erro ao carregar clientes:', error);
        }
    };

    const loadServiceData = async (serviceId) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/provided-services/${serviceId}`);
            const service = response.data;

            setFormData({
                client_id: service.client_id,
                amount: service.amount,
                date: new Date(service.date).toISOString().split('T')[0],
                description: service.description,
                num_installments: service.num_installments,
                paid: service.paid
            });
            setOriginalNumInstallments(service.num_installments);
            setClientIdInput(service.client_id.toString());
        } catch (error) {
            setError('Erro ao carregar dados do serviço');
            console.error('Erro ao carregar serviço:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            
            const serviceData = {
                client_id: formData.client_id,
                amount: Number(formData.amount),
                date: formData.date,
                description: formData.description,
                num_installments: formData.num_installments,
                paid: formData.paid,
                num_installments_changed: originalNumInstallments !== formData.num_installments
            };

            if (mode === 'create') {
                await axios.post(`${BASE_URL}/api/provided-services`, serviceData);
            } else {
                await axios.put(`${BASE_URL}/api/provided-services/${id}`, serviceData);
            }

            navigate('/provided-services');
        } catch (error) {
            setError('Erro ao salvar serviço');
            console.error('Erro ao salvar serviço:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.put(`${BASE_URL}/api/provided-services/${id}/delete`);
            navigate('/provided-services');
        } catch (error) {
            setError('Erro ao deletar serviço');
            console.error('Erro ao deletar serviço:', error);
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

    const handleClientChange = (e) => {
        const selectedClientId = parseInt(e.target.value, 10);
        setFormData(prev => ({
            ...prev,
            client_id: selectedClientId
        }));
        setClientIdInput(selectedClientId.toString());
    };

    const handleClientIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0;
        setFormData(prev => ({
            ...prev,
            client_id: inputId
        }));
        setClientIdInput(inputId.toString());
    };

    return {
        formData,
        clients,
        loading,
        error,
        clientIdInput,
        handleSubmit,
        handleDelete,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleClientChange,
        handleClientIdInputChange,
    };
}; 