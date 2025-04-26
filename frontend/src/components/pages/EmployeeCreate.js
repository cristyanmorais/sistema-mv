import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../forms/EmployeeForm';
import { useEmployeeForm } from '../../hooks/useEmployeeForm';
import Layout from '../Layout';

const EmployeeCreate = () => {
    const navigate = useNavigate();
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
        cityIdInput
    } = useEmployeeForm('create');

    return (
        <Layout>
            <h1>Criar Funcionário</h1>
            <EmployeeForm
                formData={formData}
                cities={cities}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleDelete={() => {}}
                handleChange={handleChange}
                handlePhoneChange={handlePhoneChange}
                handleCpfChange={handleCpfChange}
                handleZipCodeChange={handleZipCodeChange}
                handleNumberChange={handleNumberChange}
                handleCityChange={handleCityChange}
                handleCityIdInputChange={handleCityIdInputChange}
                cityIdInput={cityIdInput}
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </Layout>
    );
};

export default EmployeeCreate; 