import React from 'react';
import { useNavigate } from 'react-router-dom';
import SaleForm from '../forms/SaleForm';
import { useSaleForm } from '../../hooks/useSaleForm';
import Layout from '../Layout';

const CreateSale = () => {
    const navigate = useNavigate();
    const {
        formData,
        works,
        loading,
        error,
        handleSubmit,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleWorkChange,
        handleWorkIdInputChange,
        workIdInput,
        isDialogOpen,
        setIsDialogOpen
    } = useSaleForm('create', null, () => navigate('/sales'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Criar Venda</h1>
            <SaleForm
                formData={formData}
                works={works}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleAmountChange={handleAmountChange}
                handleNumInstallmentsChange={handleNumInstallmentsChange}
                handlePaidChange={handlePaidChange}
                handleWorkChange={handleWorkChange}
                handleWorkIdInputChange={handleWorkIdInputChange}
                workIdInput={workIdInput}
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </div>
        </Layout>
    );
};

export default CreateSale; 