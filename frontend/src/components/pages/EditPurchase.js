import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PurchaseForm from '../forms/PurchaseForm';
import { usePurchaseForm } from '../../hooks/usePurchaseForm';
import Layout from '../Layout';

const EditPurchase = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
        setIsDialogOpen,
        handleDelete
    } = usePurchaseForm('edit', id, () => navigate('/purchases'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Editar Compra</h1>
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
                mode="edit"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                handleDelete={handleDelete}
            />
        </div>
        </Layout>
    );
};

export default EditPurchase; 