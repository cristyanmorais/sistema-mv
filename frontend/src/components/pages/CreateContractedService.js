import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContractedServiceForm from '../forms/ContractedServiceForm';
import { useContractedServiceForm } from '../../hooks/useContractedServiceForm';
import Layout from '../Layout';

const CreateContractedService = () => {
    const navigate = useNavigate();
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
        setIsDialogOpen
    } = useContractedServiceForm('create', null, () => navigate('/contracted-services'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Criar Serviço Contratado</h1>
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
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </div>
        </Layout>
    );
};

export default CreateContractedService; 