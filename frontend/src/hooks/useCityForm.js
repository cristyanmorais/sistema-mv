import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const useCityForm = (mode, id = null) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (mode === 'edit' && id) {
            loadCityData(id);
        }
    }, [mode, id]);

    const loadCityData = async (cityId) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/cities/${cityId}`);
            setFormData(response.data);
        } catch (error) {
            setError('Erro ao carregar dados da cidade');
            console.error('Erro ao carregar cidade:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            if (mode === 'create') {
                await axios.post(`${BASE_URL}/api/cities`, formData);
            } else {
                await axios.put(`${BASE_URL}/api/cities/${id}`, formData);
            }
            navigate('/cities');
        } catch (error) {
            setError('Erro ao salvar cidade');
            console.error('Erro ao salvar cidade:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.put(`${BASE_URL}/api/cities/${id}/delete`);
            navigate('/cities');
        } catch (error) {
            setError('Erro ao deletar cidade');
            console.error('Erro ao deletar cidade:', error);
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

    return {
        formData,
        loading,
        error,
        handleSubmit,
        handleDelete,
        handleChange
    };
}; 