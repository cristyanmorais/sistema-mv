import React, { useEffect, useState } from "react";
import { Body } from "../../../Teste";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { handlePhoneChange, textNumber } from "../../../Functions";
import Layout from "../../../Layout";
import ConfirmDialog from "../../../visual-components/ConfirmDialog";

const CityDetails = () => {
    const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    const [name, setName] = useState('');

    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        if (name !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }
    }, [name])

    const handleConfirm = () =>  {
        const data = {
            name
        }

        axios.post(`${BASE_URL}/api/cities`, data)
        .catch(error => {
            console.error("Error while creating City: ", error);
        }).then(response => {
            clearFields();
        })
    }

    const clearFields = () => {
        setName('');
    }

    return (
        <Body>
            <div className='field'>
                <label>Nome:</label>
                <input type='text' value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className='field'>
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export default CityDetails;