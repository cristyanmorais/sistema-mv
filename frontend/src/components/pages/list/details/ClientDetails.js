import React, { useEffect, useState } from "react";
import { Body } from "../../../Teste";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { textNumber } from "../../../Functions";
import Layout from "../../../Layout";
import ConfirmDialog from "../../../visual-components/ConfirmDialog";


export const ClientDetails = ({ isEditing = false }) => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const { id } = useParams(); // Captura o ID do cliente
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [addressId, setAddressId] = useState(0);

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
    }, []);

    useEffect(() => {
        if (isEditing && id) {
            loadClientForEdit(id); // Carrega os dados do cliente para edição
        }
    }, [isEditing, id]);

    useEffect(() => {
        if (name !== '' && phone.length >= 10 && email !== '' && addressLine1 !== '' && zipCode.length === 8 && cityId !== 0 && number !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }
    }, [name, phone, email, addressLine1, zipCode, cityId, number])

    const handleConfirm = async (addressId) =>  {
        const data = {
            name,
            phone,
            email,
            address_id: addressId
        }

        try {
            if (isEditing && id) {
                // Atualizar cliente
                await axios.put(`${BASE_URL}/api/clients/${id}`, data);
                console.log('Cliente atualizado com sucesso!');
            } else {
                // Criar novo cliente
                await axios.post(`${BASE_URL}/api/clients`, data);
                console.log('Cliente cadastrado com sucesso!');
            }
            clearFields();
            navigate('/clients');
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
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

    const loadClientForEdit = async (clientId) => {
        try {
            const clientResponse = await axios.get(`${BASE_URL}/api/clients/${clientId}`);
            const client = clientResponse.data;

            setName(client.name);
            setPhone(client.phone);
            setEmail(client.email);
            setAddressId(client.address_id);

            const addressResponse = await axios.get(`${BASE_URL}/api/addresses/${client.address_id}`);
            const address = addressResponse.data;

            setAddressLine1(address.address_line_1);
            setAddressLine2(address.address_line_2);
            setZipCode(address.zip_code);
            setCityId(address.city_id);
            setNumber(address.number);
            setCityIdInput(address.city_id.toString());
        } catch (error) {
            console.error('Erro ao carregar cliente para edição:', error);
        }
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
                await axios.put(`${BASE_URL}/api/clients/${id}/delete`); // Atualiza para mudar `is_active` para false
                alert("Cliente deletado com sucesso!");
                navigate('/clients'); // Redireciona para a lista de clientes
            } catch (error) {
                console.error("Erro ao deletar o cliente:", error);
                alert("Ocorreu um erro ao tentar deletar o cliente.");
            } finally {
                setIsDialogOpen(false); // Fecha o popup
            }
        } else {
            alert("Não é possível deletar. O cliente não está em modo de edição ou ID inválido.");
        }
    };

    const clearFields = () => {
        setName('');
        setPhone('');
        setEmail('');
        setAddressLine1('');
        setAddressLine2('');
        setZipCode('');
        setCityId(0);
        setNumber('');
    }

    return (
        <Layout>
        <Body>
            {/* <h1>{isEditing ? 'Editar Cliente' : 'Cadastrar Cliente'}</h1> */}
            <div className='field'>
                <label>Nome:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className='field'>
                <label>Telefone:</label>
                <input type='text' value={phone} onChange={(e) => textNumber(e.target.value, setPhone, 11)} />
            </div>

            <div className='field'>
                <label>Email:</label>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
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
                message="Tem certeza de que deseja deletar este cliente?"
            />
        </div>
        </Body>
        </Layout>
    );
}

export default ClientDetails;