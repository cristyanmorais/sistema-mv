import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../forms/EmployeeForm';
import { useEmployeeForm } from '../../hooks/useEmployeeForm';
import axios from 'axios';

const EmployeeEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const {
        formData,
        cities,
        loading,
        error,
        handleSubmit,
        handleChange,
        handlePhoneChange,
        handleCpfChange,
        handleZipCodeChange,
        handleNumberChange,
        handleCityChange,
        handleCityIdInputChange,
        cityIdInput,
        setFormData
    } = useEmployeeForm('edit', id);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`/api/employees/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Erro ao carregar funcionário:', error);
            }
        };

        fetchEmployee();
    }, [id, setFormData]);

    const handleDelete = async () => {
        try {
            await axios.put(`/api/employees/${id}/delete`);
            navigate('/employees');
        } catch (error) {
            console.error('Erro ao deletar funcionário:', error);
        }
    };

    return (
        <EmployeeForm
            formData={formData}
            cities={cities}
            loading={loading}
            error={error}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handleChange={handleChange}
            handlePhoneChange={handlePhoneChange}
            handleCpfChange={handleCpfChange}
            handleZipCodeChange={handleZipCodeChange}
            handleNumberChange={handleNumberChange}
            handleCityChange={handleCityChange}
            handleCityIdInputChange={handleCityIdInputChange}
            cityIdInput={cityIdInput}
            mode="edit"
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
        />
    );
};

export default EmployeeEdit; 