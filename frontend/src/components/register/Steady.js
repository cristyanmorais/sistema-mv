import React, { useEffect, useState } from "react";
import { Body } from "../Teste";
import axios from "axios";

export const Clients = () => {
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

        axios.post('http://localhost:3000/api/clients', data)
        .catch(error => {
            console.error("Error while creating Client: ", error);
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
                <label>Name:</label>
                <input type='text' value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className='field'>
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export const Companies = () => {
    const [realName, setRealName] = useState('');
    const [fantasyName, setFantasyName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        if (realName !== '' && fantasyName !== '' && cnpj.length === 14) {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }
    }, [realName, fantasyName, cnpj])

    const handleCnpjChange = (e) => {
        const input = e.target.value;
        const numericCnpj = input.replace(/\D/g, '');

        if (numericCnpj.length <= 14) {
            setCnpj(numericCnpj);
        }
    };

    const handleConfirm = () =>  {
        const data = {
            cnpj,
            real_name: realName,
            fantasy_name: fantasyName
        }

        axios.post('http://localhost:3000/api/companies', data)
        .catch(error => {
            console.error("Error while creating Company: ", error);
        }).then(response => {
            clearFields();
        })
    }

    const clearFields = () => {
        setRealName('');
        setFantasyName('');
        setCnpj('');
    }

    return (
        <Body>
            <div className='field'>
                <label>Nome Real:</label>
                <input type='text' value={realName} onChange={e => setRealName(e.target.value)}/>
            </div>
            <div className='field'>
                <label>Nome Fantasia:</label>
                <input type='text' value={fantasyName} onChange={e => setFantasyName(e.target.value)}/>
            </div>
            <div className='field'>
                <label>CNPJ:</label>
                <input type='text' value={cnpj} onChange={handleCnpjChange} maxLength={14}/>
            </div>

            <div className='field'>
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export const Employees = () => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        if (name !== '' && cpf.length === 11) {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }
    }, [name, cpf])

    const handleCpfChange = (e) => {
        const input = e.target.value;
        const numericCpf = input.replace(/\D/g, '');

        if (numericCpf.length <= 11) {
            setCpf(numericCpf);
        }
    };

    const handleConfirm = () =>  {
        const data = {
            name,
            cpf
        }

        axios.post('http://localhost:3000/api/employees', data)
        .catch(error => {
            console.error("Error while creating Client: ", error);
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
                <label>Cpf:</label>
                <input type='text' value={cpf} maxLength={11} onChange={handleCpfChange}/>
            </div>

            <div className='field'>
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}

export const Works = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [filledFields, setFilledFields] = useState(false);

    useEffect(() => {
        if (name !== '' && address !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }
    }, [name, address])

    const handleConfirm = () =>  {
        const data = {
            name,
            address
        }

        axios.post('http://localhost:3000/api/works', data)
        .catch(error => {
            console.error("Error while creating Client: ", error);
        }).then(response => {
            clearFields();
        })
    }

    const clearFields = () => {
        setName('');
        setAddress('');
    }

    return (
        <Body>
            <div className='field'>
                <label>Nome:</label>
                <input type='text' value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className='field'>
                <label>Endereço:</label>
                <input type='text' value={address} onChange={e => setAddress(e.target.value)}/>
            </div>

            <div className='field'>
                <button onClick={handleConfirm} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}