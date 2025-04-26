import React from 'react';
import { useNavigate } from 'react-router-dom';
import PurchaseForm from '../forms/PurchaseForm';
import { usePurchaseForm } from '../../hooks/usePurchaseForm';
import Layout from '../Layout';

const CreatePurchase = () => {
    const navigate = useNavigate();
    const {
        formData,
        companies,
        loading,
        error,
        handleSubmit,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleCompanyChange,
        handleCompanyIdInputChange,
        companyIdInput,
        isDialogOpen,
        setIsDialogOpen
    } = usePurchaseForm('create', null, () => navigate('/purchases'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Criar Compra</h1>
            <PurchaseForm
                formData={formData}
                companies={companies}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleAmountChange={handleAmountChange}
                handleNumInstallmentsChange={handleNumInstallmentsChange}
                handlePaidChange={handlePaidChange}
                handleCompanyChange={handleCompanyChange}
                handleCompanyIdInputChange={handleCompanyIdInputChange}
                companyIdInput={companyIdInput}
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </div>
        </Layout>
    );
};

export default CreatePurchase; 