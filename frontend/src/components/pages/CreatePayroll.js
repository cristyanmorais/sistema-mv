import React from 'react';
import { useNavigate } from 'react-router-dom';
import PayrollForm from '../forms/PayrollForm';
import { usePayrollForm } from '../../hooks/usePayrollForm';
import Layout from '../Layout';

const CreatePayroll = () => {
    const navigate = useNavigate();
    const {
        formData,
        employees,
        loading,
        error,
        handleSubmit,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleEmployeeChange,
        handleEmployeeIdInputChange,
        employeeIdInput,
        isDialogOpen,
        setIsDialogOpen
    } = usePayrollForm('create', null, () => navigate('/payroll'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Criar Folha de Pagamento</h1>
            <PayrollForm
                formData={formData}
                employees={employees}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleAmountChange={handleAmountChange}
                handleNumInstallmentsChange={handleNumInstallmentsChange}
                handlePaidChange={handlePaidChange}
                handleEmployeeChange={handleEmployeeChange}
                handleEmployeeIdInputChange={handleEmployeeIdInputChange}
                employeeIdInput={employeeIdInput}
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </div>
        </Layout>
    );
};

export default CreatePayroll; 