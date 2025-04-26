import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProvidedServiceForm from '../forms/ProvidedServiceForm';
import { useProvidedServiceForm } from '../../hooks/useProvidedServiceForm';
import Layout from '../Layout';

const EditProvidedService = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        formData,
        clients,
        works,
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
        setIsDialogOpen,
        handleDelete
    } = useProvidedServiceForm('edit', id, () => navigate('/provided-services'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Editar Serviço Prestado</h1>
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
                mode="edit"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                handleDelete={handleDelete}
            />
        </div>
        </Layout>
    );
};

export default EditProvidedService; 