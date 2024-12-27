import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { handlePhoneChange, textNumber } from "../../../Functions";
import Layout from "../../../Layout";
import ConfirmDialog from "../../../visual-components/ConfirmDialog";
import "./details.css";

const CityDetails = ({ isEditing = false }) => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { id } = useParams();
    const [name, setName] = useState('');

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        if (name !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }
    }, [name])

    useEffect(() => {
            if (isEditing && id) {
                loadCityForEdit(id);
            }
        }, [isEditing, id]);

    const handleConfirm = async () =>  {
        const data = {
            name
        }

        try {
            if (isEditing && id) {
                await axios.put(`${BASE_URL}/api/cities/${id}`, data);
                console.log('Cidade atualizada com sucesso!');
            } else {
                await axios.post(`${BASE_URL}/api/cities`, data);
                console.log('Cidade cadastrada com sucesso!');
            }
            clearFields();
            navigate('/cities');
        } catch (error) {
            console.error('Erro ao salvar cidade:', error);
        }
    }

    const loadCityForEdit = async (cityId) => {
        try {
            const cityResponse = await axios.get(`${BASE_URL}/api/cities/${cityId}`);
            const city = cityResponse.data;

            setName(city.name);
        } catch (error) {
            console.error('Erro ao carregar Cidade para edição:', error);
        }
    };

    const handleDelete = async () => {
        if (isEditing && id) {
            try {
                await axios.put(`${BASE_URL}/api/cities/${id}/delete`);
                alert("Cidade deletada com sucesso!");
                navigate('/cities');
            } catch (error) {
                console.error("Erro ao deletar a cidade:", error);
                alert("Ocorreu um erro ao tentar deletar a cidade.");
            } finally {
                setIsDialogOpen(false);
            }
        } else {
            alert("Não é possível deletar. a cidade não está em modo de edição ou ID inválido.");
        }
    };

    const clearFields = () => {
        setName('');
    }

    return (
        <Layout>
        <div className="body">
            <div className='field'>
                <label>Nome:</label>
                <input type='text' value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className='field'>
                <button onClick={handleConfirm} disabled={!filledFields}>
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
                message="Tem certeza de que deseja deletar esta cidade?"
            />
            </div>
        </div>
        </Layout>
    );
}

export default CityDetails;