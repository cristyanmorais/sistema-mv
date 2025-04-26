import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WorkForm from '../forms/WorkForm';
import { useWorkForm } from '../../hooks/useWorkForm';
import axios from 'axios';

const WorkEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const {
        formData,
        cities,
        clients,
        loading,
        error,
        handleSubmit,
        handleChange,
        handleAreaChange,
        handleFloorsChange,
        handleZipCodeChange,
        handleNumberChange,
        handleCityChange,
        handleCityIdInputChange,
        handleClientChange,
        handleClientIdInputChange,
        cityIdInput,
        clientIdInput,
        setFormData
    } = useWorkForm('edit', id);

    useEffect(() => {
        const fetchWork = async () => {
            try {
                const response = await axios.get(`/api/works/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Erro ao carregar obra:', error);
            }
        };

        fetchWork();
    }, [id, setFormData]);

    const handleDelete = async () => {
        try {
            await axios.put(`/api/works/${id}/delete`);
            navigate('/works');
        } catch (error) {
            console.error('Erro ao deletar obra:', error);
        }
    };

    return (
        <WorkForm
            formData={formData}
            cities={cities}
            clients={clients}
            loading={loading}
            error={error}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handleChange={handleChange}
            handleAreaChange={handleAreaChange}
            handleFloorsChange={handleFloorsChange}
            handleZipCodeChange={handleZipCodeChange}
            handleNumberChange={handleNumberChange}
            handleCityChange={handleCityChange}
            handleCityIdInputChange={handleCityIdInputChange}
            handleClientChange={handleClientChange}
            handleClientIdInputChange={handleClientIdInputChange}
            cityIdInput={cityIdInput}
            clientIdInput={clientIdInput}
            mode="edit"
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
        />
    );
};

export default WorkEdit; 