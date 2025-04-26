import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkForm from '../forms/WorkForm';
import { useWorkForm } from '../../hooks/useWorkForm';
import Layout from '../Layout';

const WorkCreate = () => {
    const navigate = useNavigate();
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
        clientIdInput
    } = useWorkForm('create');

    return (
        <Layout>
            <h1>Criar Obra</h1>
            <WorkForm
                formData={formData}
                cities={cities}
                clients={clients}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleDelete={() => {}}
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
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </Layout>
    );
};

export default WorkCreate; 