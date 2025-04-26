import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContractedServiceForm from '../forms/ContractedServiceForm';
import { useContractedServiceForm } from '../../hooks/useContractedServiceForm';
import Layout from '../Layout';

const EditContractedService = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        formData,
        employees,
        works,
        loading,
        error,
        handleSubmit,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleEmployeeChange,
        handleEmployeeIdInputChange,
        handleWorkChange,
        handleWorkIdInputChange,
        employeeIdInput,
        workIdInput,
        isDialogOpen,
        setIsDialogOpen,
        handleDelete
    } = useContractedServiceForm('edit', id, () => navigate('/contracted-services'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Editar Serviço Contratado</h1>
            <ContractedServiceForm
                formData={formData}
                employees={employees}
                works={works}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleAmountChange={handleAmountChange}
                handleNumInstallmentsChange={handleNumInstallmentsChange}
                handlePaidChange={handlePaidChange}
                handleEmployeeChange={handleEmployeeChange}
                handleEmployeeIdInputChange={handleEmployeeIdInputChange}
                handleWorkChange={handleWorkChange}
                handleWorkIdInputChange={handleWorkIdInputChange}
                employeeIdInput={employeeIdInput}
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

export default EditContractedService; 