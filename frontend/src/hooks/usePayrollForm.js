import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const usePayrollForm = (mode, id = null) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employee_id: 0,
        amount: '',
        date: '',
        description: '',
        num_installments: 1,
        paid: false
    });
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [employeeIdInput, setEmployeeIdInput] = useState('');
    const [originalNumInstallments, setOriginalNumInstallments] = useState('');

    useEffect(() => {
        loadEmployees();
        if (mode === 'edit' && id) {
            loadServiceData(id);
        }
    }, [mode, id]);

    const loadEmployees = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/employees`);
            setEmployees(response.data);
        } catch (error) {
            setError('Erro ao carregar lista de funcionários');
            console.error('Erro ao carregar funcionários:', error);
        }
    };

    const loadServiceData = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/payroll/${id}`);
            const payroll = response.data;

            setFormData({
                employee_id: payroll.employee_id,
                amount: payroll.amount,
                date: new Date(payroll.date).toISOString().split('T')[0],
                description: payroll.description,
                num_installments: payroll.num_installments,
                paid: payroll.paid
            });
            setOriginalNumInstallments(payroll.num_installments);
            setEmployeeIdInput(payroll.employee_id.toString());
        } catch (error) {
            setError('Erro ao carregar dados da folha de pagamento');
            console.error('Erro ao carregar folha de pagamento:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            
            const payrollData = {
                employee_id: formData.employee_id,
                amount: Number(formData.amount),
                date: formData.date,
                description: formData.description,
                num_installments: formData.num_installments,
                paid: formData.paid,
                num_installments_changed: originalNumInstallments !== formData.num_installments
            };

            if (mode === 'create') {
                await axios.post(`${BASE_URL}/api/payroll`, payrollData);
            } else {
                await axios.put(`${BASE_URL}/api/payroll/${id}`, payrollData);
            }

            navigate('/payroll');
        } catch (error) {
            setError('Erro ao salvar folha de pagamento');
            console.error('Erro ao salvar folha de pagamento:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.put(`${BASE_URL}/api/payroll/${id}/delete`);
            navigate('/payroll');
        } catch (error) {
            setError('Erro ao deletar folha de pagamento');
            console.error('Erro ao deletar folha de pagamento:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAmountChange = (value) => {
        setFormData(prev => ({
            ...prev,
            amount: value
        }));
    };

    const handleNumInstallmentsChange = (value) => {
        setFormData(prev => ({
            ...prev,
            num_installments: value
        }));
    };

    const handlePaidChange = (value) => {
        setFormData(prev => ({
            ...prev,
            paid: value
        }));
    };

    const handleEmployeeChange = (e) => {
        const selectedEmployeeId = parseInt(e.target.value, 10);
        setFormData(prev => ({
            ...prev,
            employee_id: selectedEmployeeId
        }));
        setEmployeeIdInput(selectedEmployeeId.toString());
    };

    const handleEmployeeIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0;
        setFormData(prev => ({
            ...prev,
            employee_id: inputId
        }));
        setEmployeeIdInput(inputId.toString());
    };

    return {
        formData,
        employees,
        loading,
        error,
        employeeIdInput,
        handleSubmit,
        handleDelete,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleEmployeeChange,
        handleEmployeeIdInputChange,
    };
}; 