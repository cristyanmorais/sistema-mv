import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const useContractedServiceForm = (mode, id = null) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employee_id: 0,
        work_id: 0,
        amount: '',
        date: '',
        description: '',
        num_installments: 1,
        paid: false
    });
    const [employees, setEmployees] = useState([]);
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [employeeIdInput, setEmployeeIdInput] = useState('');
    const [workIdInput, setWorkIdInput] = useState('');
    const [originalNumInstallments, setOriginalNumInstallments] = useState('');

    useEffect(() => {
        loadEmployees();
        loadWorks();
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

    const loadWorks = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/works`);
            setWorks(response.data);
        } catch (error) {
            setError('Erro ao carregar lista de obras');
            console.error('Erro ao carregar obras:', error);
        }
    };

    const loadServiceData = async (serviceId) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/contracted-services/${serviceId}`);
            const service = response.data;

            setFormData({
                employee_id: service.employee_id,
                work_id: service.work_id,
                amount: service.amount,
                date: new Date(service.date).toISOString().split('T')[0],
                description: service.description,
                num_installments: service.num_installments,
                paid: service.paid
            });
            setOriginalNumInstallments(service.num_installments);
            setEmployeeIdInput(service.employee_id.toString());
            setWorkIdInput(service.work_id.toString());
        } catch (error) {
            setError('Erro ao carregar dados do serviço');
            console.error('Erro ao carregar serviço:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            
            const serviceData = {
                employee_id: formData.employee_id,
                work_id: formData.work_id,
                amount: Number(formData.amount),
                date: formData.date,
                description: formData.description,
                num_installments: formData.num_installments,
                paid: formData.paid,
                num_installments_changed: originalNumInstallments !== formData.num_installments
            };

            if (mode === 'create') {
                await axios.post(`${BASE_URL}/api/contracted-services`, serviceData);
            } else {
                await axios.put(`${BASE_URL}/api/contracted-services/${id}`, serviceData);
            }

            navigate('/contracted-services');
        } catch (error) {
            setError('Erro ao salvar serviço');
            console.error('Erro ao salvar serviço:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.put(`${BASE_URL}/api/contracted-services/${id}/delete`);
            navigate('/contracted-services');
        } catch (error) {
            setError('Erro ao deletar serviço');
            console.error('Erro ao deletar serviço:', error);
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

    const handleWorkChange = (e) => {
        const selectedWorkId = parseInt(e.target.value, 10);
        setFormData(prev => ({
            ...prev,
            work_id: selectedWorkId
        }));
        setWorkIdInput(selectedWorkId.toString());
    };

    const handleWorkIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0;
        setFormData(prev => ({
            ...prev,
            work_id: inputId
        }));
        setWorkIdInput(inputId.toString());
    };

    return {
        formData,
        employees,
        works,
        loading,
        error,
        employeeIdInput,
        workIdInput,
        handleSubmit,
        handleDelete,
        handleChange,
        handleAmountChange,
        handleNumInstallmentsChange,
        handlePaidChange,
        handleEmployeeChange,
        handleEmployeeIdInputChange,
        handleWorkChange,
        handleWorkIdInputChange
    };
}; 