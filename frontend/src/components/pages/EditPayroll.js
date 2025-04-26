import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PayrollForm from '../forms/PayrollForm';
import { usePayrollForm } from '../../hooks/usePayrollForm';
import Layout from '../Layout';

const EditPayroll = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
        setIsDialogOpen,
        handleDelete
    } = usePayrollForm('edit', id, () => navigate('/payroll'));

    return (
        <Layout>
        <div className="page-container">
            <h1>Editar Folha de Pagamento</h1>
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
                mode="edit"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                handleDelete={handleDelete}
            />
        </div>
        </Layout>
    );
};

export default EditPayroll; 