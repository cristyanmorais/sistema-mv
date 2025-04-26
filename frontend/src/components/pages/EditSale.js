import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SaleForm from '../forms/SaleForm';
import { useSaleForm } from '../../hooks/useSaleForm';
import Layout from '../Layout';

const EditSale = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
        setIsDialogOpen,
        handleDelete
    } = useSaleForm('edit', id, () => navigate('/sales'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Editar Venda</h1>
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
                mode="edit"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                handleDelete={handleDelete}
            />
        </div>
        </Layout>
    );
};

export default EditSale; 