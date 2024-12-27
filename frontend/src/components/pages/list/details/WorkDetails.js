import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { textNumber } from "../../../Functions";
import Layout from "../../../Layout";
import ConfirmDialog from "../../../visual-components/ConfirmDialog";
import "./details.css";


export const WorkDetails = ({ isEditing = false }) => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const { id } = useParams(); // Captura o ID do obra
    const [name, setName] = useState('');
    const [area, setArea] = useState(0);
    const [floors, setFloors] = useState(0);
    const [clientId, setClientId] = useState(0);
    const [addressId, setAddressId] = useState(0);

    const [clients, setClients] = useState([]);
    const [clientIdInput, setClientIdInput] = useState('');
    const [cities, setCities] = useState([]);
    const [cityIdInput, setCityIdInput] = useState('');

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [cityId, setCityId] = useState(0);
    const [number, setNumber] = useState('');

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/cities`)
        .then(response => setCities(response.data))
        .catch(error => console.error('Error: ', error));

        axios.get(`${BASE_URL}/api/clients`)
        .then(response => setClients(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        if (isEditing && id) {
            loadWorkForEdit(id); // Carrega os dados do obra para edição
        }
    }, [isEditing, id]);

    useEffect(() => {
        if (name !== '' && area !== 0 && floors !== 0 && clientId !== 0 && addressLine1 !== '' && zipCode.length === 8 && cityId !== 0 && number !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }
    }, [name, area, floors, clientId, addressLine1, zipCode, cityId, number])

    const handleConfirm = async (addressId) =>  {
        const data = {
            name,
            area: Number(area),
            floors: Number(floors),
            client_id: clientId,
            address_id: addressId
        }

        try {
            if (isEditing && id) {
                // Atualizar obra
                await axios.put(`${BASE_URL}/api/works/${id}`, data);
                console.log('Obra atualizado com sucesso!');
            } else {
                // Criar novo obra
                await axios.post(`${BASE_URL}/api/works`, data);
                console.log('Obra cadastrado com sucesso!');
            }
            clearFields();
            navigate('/works');
        } catch (error) {
            console.error('Erro ao salvar obra:', error);
        }
    }

    const handleAddress = async () => {
        try {
            if (!cityId || !zipCode || !addressLine1 || !number) {
                throw new Error("Preencha todos os campos do endereço!");
            }
    
            if (isEditing && id) {
                console.log("if de edit")
                // Atualizar endereço existente
                const response = await axios.put(`${BASE_URL}/api/addresses/${addressId}`, {
                    address_line_1: addressLine1,
                    address_line_2: addressLine2,
                    zip_code: zipCode,
                    city_id: cityId,
                    number,
                });
            } else {
                console.log("else de post")
                // Criar novo endereço
                const response = await axios.post(`${BASE_URL}/api/addresses`, {
                    address_line_1: addressLine1,
                    address_line_2: addressLine2,
                    zip_code: zipCode,
                    city_id: cityId,
                    number,
                });
                addressId = response.data.id;
            }
    
            handleConfirm(addressId);
        } catch (error) {
            console.error("Erro ao salvar endereço:", error);
        }
    };

    const loadWorkForEdit = async (workId) => {
        try {
            const workResponse = await axios.get(`${BASE_URL}/api/works/${workId}`);
            const work = workResponse.data;

            setName(work.name);
            setArea(work.area);
            setFloors(work.floors);
            setClientId(work.client_id);
            setClientIdInput(work.client_id);
            setAddressId(work.address_id);

            const addressResponse = await axios.get(`${BASE_URL}/api/addresses/${work.address_id}`);
            const address = addressResponse.data;

            setAddressLine1(address.address_line_1);
            setAddressLine2(address.address_line_2);
            setZipCode(address.zip_code);
            setCityId(address.city_id);
            setNumber(address.number);
            setCityIdInput(address.city_id.toString());
        } catch (error) {
            console.error('Erro ao carregar obra para edição:', error);
        }
    };

    const handleClientChange = (e) => {
        const selectedClientId = parseInt(e.target.value, 10); // Converte para número
        setClientId(selectedClientId);
        setClientIdInput(selectedClientId.toString()); // Sincroniza o campo de input de ID
    };
    
    const handleClientIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0; // Converte para número ou 0 se inválido
        setClientId(inputId);
        setClientIdInput(inputId.toString());
    };

    const handleCityChange = (e) => {
        const selectedCityId = parseInt(e.target.value, 10); // Converte para número
        setCityId(selectedCityId);
        setCityIdInput(selectedCityId.toString()); // Sincroniza o campo de input de ID
    };
    
    const handleCityIdInputChange = (e) => {
        const inputId = parseInt(e.target.value, 10) || 0; // Converte para número ou 0 se inválido
        setCityId(inputId);
        setCityIdInput(inputId.toString());
    };

    const handleDelete = async () => {
        if (isEditing && id) {
            try {
                await axios.put(`${BASE_URL}/api/works/${id}/delete`); // Atualiza para mudar `is_active` para false
                alert("Obra deletado com sucesso!");
                navigate('/works'); // Redireciona para a lista de obras
            } catch (error) {
                console.error("Erro ao deletar o obra:", error);
                alert("Ocorreu um erro ao tentar deletar o obra.");
            } finally {
                setIsDialogOpen(false); // Fecha o popup
            }
        } else {
            alert("Não é possível deletar. O obra não está em modo de edição ou ID inválido.");
        }
    };

    const clearFields = () => {
        setName('');
        setArea(0);
        setFloors(0);
        setClientId(0);
        setAddressLine1('');
        setAddressLine2('');
        setZipCode('');
        setCityId(0);
        setNumber('');
    }

    return (
        <Layout>
        <div className="body">
            {/* <h1>{isEditing ? 'Editar Obra' : 'Cadastrar Obra'}</h1> */}
            <div className='field'>
                <label>Nome:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className='field'>
                <label>Area:</label>
                <input type='number' value={area} onChange={e => setArea(e.target.value)}/>
            </div>

            <div className='field'>
                <label>Andares:</label>
                <input type='number' value={floors} onChange={e => setFloors(e.target.value)}/>
            </div>

            <div className='select-id'>
                    <input
                        // type='number'
                        placeholder='ID'
                        value={clientIdInput}
                        onChange={handleClientIdInputChange}
                    />
                    <select value={clientId} onChange={handleClientChange}>
                        <option value={0} disabled>Selecione um Cliente</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
            </div>

            {/* Endereço */}
            <div>
                <div className='field'>
                    <label>Rua:</label>
                    <input type='text' value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
                </div>

                <div className='field'>
                    <label>Complemento:</label>
                    <input type='text' value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
                </div>

                <div className='field'>
                    <label>Número:</label>
                    <input type='text' value={number} onChange={(e) => textNumber(e.target.value, setNumber, 10)} />
                </div>

                <div className='field'>
                    <label>CEP:</label>
                    <input type='text' value={zipCode} onChange={(e) => textNumber(e.target.value, setZipCode, 8)} />
                </div>

                <div className='select-id'>
                    <input
                        placeholder='ID'
                        value={cityIdInput}
                        onChange={handleCityIdInputChange}
                    />
                    <select value={cityId} onChange={handleCityChange}>
                        <option value={0} disabled>
                            Selecione uma Cidade
                        </option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='field'>
                <button onClick={handleAddress} disabled={!filledFields}>
                    {isEditing ? 'Salvar Alterações' : 'Confirmar'}
                </button>
            </div>

            <div>
            {isEditing && (
                <div className="field">
                    <button onClick={() => setIsDialogOpen(true)}>
                        Deletar
                    </button>
                </div>
            )}

            {/* Popup de confirmação */}
            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDelete}
                message="Tem certeza de que deseja deletar este obra?"
            />
        </div>
        </div>
        </Layout>
    );
}

export default WorkDetails;