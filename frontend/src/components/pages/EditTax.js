import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaxForm from '../forms/TaxForm';
import { useTaxForm } from '../../hooks/useTaxForm';
import Layout from '../Layout';

const EditTax = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
        setIsDialogOpen,
        handleDelete
    } = useTaxForm('edit', id, () => navigate('/taxes'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Editar Imposto</h1>
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
                mode="edit"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                handleDelete={handleDelete}
            />
        </div>
        </Layout>
    );
};

export default EditTax; 