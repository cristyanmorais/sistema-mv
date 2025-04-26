import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProvidedServiceForm from '../forms/ProvidedServiceForm';
import { useProvidedServiceForm } from '../../hooks/useProvidedServiceForm';
import Layout from '../Layout';

const CreateProvidedService = () => {
    const navigate = useNavigate();
    const {
        formData,
        clients,
        loading,
        error,
        handleSubmit,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleClientChange,
        handleClientIdInputChange,
        clientIdInput,
        isDialogOpen,
        setIsDialogOpen
    } = useProvidedServiceForm('create', null, () => navigate('/provided-services'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Criar Serviço Prestado</h1>
            <ProvidedServiceForm
                formData={formData}
                clients={clients}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleAmountChange={handleAmountChange}
                handleNumInstallmentsChange={handleNumInstallmentsChange}
                handlePaidChange={handlePaidChange}
                handleClientChange={handleClientChange}
                handleClientIdInputChange={handleClientIdInputChange}
                clientIdInput={clientIdInput}
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </div>
        </Layout>
    );
};

export default CreateProvidedService; 