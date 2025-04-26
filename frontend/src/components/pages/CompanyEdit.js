import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CompanyForm from '../forms/CompanyForm';
import { useCompanyForm } from '../../hooks/useCompanyForm';
import axios from 'axios';

const CompanyEdit = () => {
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
        handleCnpjChange,
        handleZipCodeChange,
        handleNumberChange,
        handleCityChange,
        handleCityIdInputChange,
        cityIdInput,
        setFormData
    } = useCompanyForm('edit', id);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get(`/api/companies/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Erro ao carregar empresa:', error);
            }
        };

        fetchCompany();
    }, [id, setFormData]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/companies/${id}`);
            navigate('/companies');
        } catch (error) {
            console.error('Erro ao deletar empresa:', error);
        }
    };

    return (
        <CompanyForm
            formData={formData}
            cities={cities}
            loading={loading}
            error={error}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handleChange={handleChange}
            handlePhoneChange={handlePhoneChange}
            handleCnpjChange={handleCnpjChange}
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

export default CompanyEdit; 