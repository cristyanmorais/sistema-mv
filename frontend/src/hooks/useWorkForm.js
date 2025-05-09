import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const useWorkForm = (mode, id = null) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        area: 0,
        floors: 0,
        client_id: 0,
        address: {
            address_line_1: '',
            address_line_2: '',
            zip_code: '',
            city_id: 0,
            number: ''
        }
    });
    const [cities, setCities] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cityIdInput, setCityIdInput] = useState('');
    const [clientIdInput, setClientIdInput] = useState('');

    useEffect(() => {
        loadCities();
        loadClients();
        if (mode === 'edit' && id) {
            loadWorkData(id);
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

    const loadClients = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/clients`);
            setClients(response.data);
        } catch (error) {
            setError('Erro ao carregar lista de clientes');
            console.error('Erro ao carregar clientes:', error);
        }
    };

    const loadWorkData = async (workId) => {
        try {
            setLoading(true);
            const workResponse = await axios.get(`${BASE_URL}/api/works/${workId}`);
            const work = workResponse.data;

            const addressResponse = await axios.get(`${BASE_URL}/api/addresses/${work.address_id}`);
            const address = addressResponse.data;

            setFormData({
                name: work.name,
                area: work.area,
                floors: work.floors,
                client_id: work.client_id,
                address: {
                    address_line_1: address.address_line_1,
                    address_line_2: address.address_line_2 || '',
                    zip_code: address.zip_code,
                    city_id: address.city_id,
                    number: address.number
                }
            });
            setCityIdInput(address.city_id.toString());
            setClientIdInput(work.client_id.toString());
        } catch (error) {
            setError('Erro ao carregar dados da obra');
            console.error('Erro ao carregar obra:', error);
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
                const workResponse = await axios.get(`${BASE_URL}/api/works/${id}`);
                addressId = workResponse.data.address_id;
                await axios.put(`${BASE_URL}/api/addresses/${addressId}`, formData.address);
            } else {
                const addressResponse = await axios.post(`${BASE_URL}/api/addresses`, formData.address);
                addressId = addressResponse.data.id;
            }

            // Depois, salva a obra
            const workData = {
                name: formData.name,
                area: Number(formData.area),
                floors: Number(formData.floors),
                client_id: formData.client_id,
                address_id: addressId
            };

            if (mode === 'create') {
                await axios.post(`${BASE_URL}/api/works`, workData);
            } else {
                await axios.put(`${BASE_URL}/api/works/${id}`, workData);
            }

            navigate('/works');
        } catch (error) {
            setError('Erro ao salvar obra');
            console.error('Erro ao salvar obra:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.put(`${BASE_URL}/api/works/${id}/delete`);
            navigate('/works');
        } catch (error) {
            setError('Erro ao deletar obra');
            console.error('Erro ao deletar obra:', error);
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

    const handleAreaChange = (value) => {
        setFormData(prev => ({
            ...prev,
            area: value
        }));
    };

    const handleFloorsChange = (value) => {
        setFormData(prev => ({
            ...prev,
            floors: value
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

    const handleClientChange = (e) => {
        const selectedClientId = parseInt(e.target.value, 10);
        setFormData(prev => ({
            ...prev,
            client_id: selectedClientId
        }));
        setClientIdInput(selectedClientId.toString());
    };

    const handleClientIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0;
        setFormData(prev => ({
            ...prev,
            client_id: inputId
        }));
        setClientIdInput(inputId.toString());
    };

    return {
        formData,
        cities,
        clients,
        loading,
        error,
        cityIdInput,
        clientIdInput,
        handleSubmit,
        handleDelete,
        handleChange,
        handleAreaChange,
        handleFloorsChange,
        handleZipCodeChange,
        handleNumberChange,
        handleCityChange,
        handleCityIdInputChange,
        handleClientChange,
        handleClientIdInputChange
    };
}; 