import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const useCompanyForm = (mode, id = null) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fantasy_name: '',
        real_name: '',
        cnpj: '',
        phone: '',
        email: '',
        address: {
            address_line_1: '',
            address_line_2: '',
            zip_code: '',
            city_id: 0,
            number: ''
        }
    });
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cityIdInput, setCityIdInput] = useState('');

    useEffect(() => {
        loadCities();
        if (mode === 'edit' && id) {
            loadCompanyData(id);
        }
    }, [mode, id]);

    const loadCities = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/cities`);
            setCities(response.data);
        } catch (error) {
            setError('Erro ao carregar lista de cidades');
            console.error('Erro ao carregar cidades:', error);
        }
    };

    const loadCompanyData = async (companyId) => {
        try {
            setLoading(true);
            const companyResponse = await axios.get(`${BASE_URL}/api/companies/${companyId}`);
            const company = companyResponse.data;

            const addressResponse = await axios.get(`${BASE_URL}/api/addresses/${company.address_id}`);
            const address = addressResponse.data;

            setFormData({
                fantasy_name: company.fantasy_name,
                real_name: company.real_name,
                cnpj: company.cnpj,
                phone: company.phone,
                email: company.email,
                address: {
                    address_line_1: address.address_line_1,
                    address_line_2: address.address_line_2 || '',
                    zip_code: address.zip_code,
                    city_id: address.city_id,
                    number: address.number
                }
            });
            setCityIdInput(address.city_id.toString());
        } catch (error) {
            setError('Erro ao carregar dados da empresa');
            console.error('Erro ao carregar empresa:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            
            // Primeiro, salva o endereço
            let addressId;
            if (mode === 'edit' && id) {
                const companyResponse = await axios.get(`${BASE_URL}/api/companies/${id}`);
                addressId = companyResponse.data.address_id;
                await axios.put(`${BASE_URL}/api/addresses/${addressId}`, formData.address);
            } else {
                const addressResponse = await axios.post(`${BASE_URL}/api/addresses`, formData.address);
                addressId = addressResponse.data.id;
            }

            // Depois, salva a empresa
            const companyData = {
                fantasy_name: formData.fantasy_name,
                real_name: formData.real_name,
                cnpj: formData.cnpj,
                phone: formData.phone,
                email: formData.email,
                address_id: addressId
            };

            console.log('formData',formData);

            if (mode === 'create') {
                await axios.post(`${BASE_URL}/api/companies`, companyData);
            } else {
                await axios.put(`${BASE_URL}/api/companies/${id}`, companyData);
            }

            navigate('/companies');
        } catch (error) {
            setError('Erro ao salvar empresa');
            console.error('Erro ao salvar empresa:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.put(`${BASE_URL}/api/companies/${id}/delete`);
            navigate('/companies');
        } catch (error) {
            setError('Erro ao deletar empresa');
            console.error('Erro ao deletar empresa:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handlePhoneChange = (value) => {
        setFormData(prev => ({
            ...prev,
            phone: value
        }));
    };

    const handleCnpjChange = (value) => {
        setFormData(prev => ({
            ...prev,
            cnpj: value
        }));
    };

    const handleZipCodeChange = (value) => {
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                zip_code: value
            }
        }));
    };

    const handleNumberChange = (value) => {
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                number: value
            }
        }));
    };

    const handleCityChange = (e) => {
        const selectedCityId = parseInt(e.target.value, 10);
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                city_id: selectedCityId
            }
        }));
        setCityIdInput(selectedCityId.toString());
    };

    const handleCityIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0;
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                city_id: inputId
            }
        }));
        setCityIdInput(inputId.toString());
    };

    return {
        formData,
        cities,
        loading,
        error,
        cityIdInput,
        handleSubmit,
        handleDelete,
        handleChange,
        handlePhoneChange,
        handleCnpjChange,
        handleZipCodeChange,
        handleNumberChange,
        handleCityChange,
        handleCityIdInputChange
    };
}; 