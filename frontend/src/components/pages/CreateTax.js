import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaxForm from '../forms/TaxForm';
import { useTaxForm } from '../../hooks/useTaxForm';
import Layout from '../Layout';

const CreateTax = () => {
    const navigate = useNavigate();
    const {
        formData,
        types,
        loading,
        error,
        handleSubmit,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleTypeChange,
        handleTypeIdInputChange,
        typeIdInput,
        isDialogOpen,
        setIsDialogOpen
    } = useTaxForm('create', null, () => navigate('/taxes'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Criar Imposto</h1>
            <TaxForm
                formData={formData}
                types={types}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleAmountChange={handleAmountChange}
                handleNumInstallmentsChange={handleNumInstallmentsChange}
                handlePaidChange={handlePaidChange}
                handleTypeChange={handleTypeChange}
                handleTypeIdInputChange={handleTypeIdInputChange}
                typeIdInput={typeIdInput}
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </div>
        </Layout>
    );
};

export default CreateTax; 