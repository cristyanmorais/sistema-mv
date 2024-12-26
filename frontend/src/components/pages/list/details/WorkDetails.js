export const Works = () => {
    const [name, setName] = useState('');
    const [area, setArea] = useState(0);
    const [floors, setFloors] = useState(0);
    const [clientId, setClientId] = useState(0);

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
        axios.get(`${BASE_URL}/api/clients`)
        .then(response => setClients(response.data))
        .catch(error => console.error('Error: ', error));

        axios.get(`${BASE_URL}/api/cities`)
        .then(response => setCities(response.data))
        .catch(error => console.error('Error: ', error));
    }, []);

    useEffect(() => {
        if (name !== '' && area !== 0 && floors !== 0 && clientId !== 0 && addressLine1 !== '' && zipCode !== '' && cityId !== 0 && number !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }
    }, [name, area, floors, clientId, addressLine1, zipCode, cityId, number])

    const handleConfirm = (addressId) =>  {
        const data = {
            name,
            area: Number(area),
            floors: Number(floors),
            client_id: clientId,
            address_id: addressId
        }

        axios.post(`${BASE_URL}/api/works`, data)
        .catch(error => {
            console.error("Error while creating Client: ", error);
        }).then(response => {
            clearFields();
        })
    }

    const handleAddress = async () =>  {
        try {
            const responseAddress = await axios.post(`${BASE_URL}/api/addresses`, {
                address_line_1: addressLine1,
                address_line_2: addressLine2,
                zip_code: zipCode,
                city_id: cityId,
                number
            })

            handleConfirm(responseAddress.data.id);
        } catch (e) {
            console.error('Erro ao cadastrar endereço:', e);
        }
    }

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
        <Body>
            <div className='field'>
                <label>Nome:</label>
                <input type='text' value={name} onChange={e => setName(e.target.value)}/>
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

            <div>
                <div className='field'>
                    <label>Rua:</label>
                    <input type='text' value={addressLine1} onChange={e => setAddressLine1(e.target.value)}/>
                </div>

                <div className='field'>
                    <label>Complemento:</label>
                    <input type='text' value={addressLine2} onChange={e => setAddressLine2(e.target.value)}/>
                </div>

                <div className='field'>
                    <label>Número:</label>
                    <input type='text' value={number} onChange={e => textNumber(e.target.value, setNumber)}/>
                </div>

                <div className='field'>
                    <label>CEP:</label>
                    <input type='text' value={zipCode} onChange={e => setZipCode(e.target.value)}/>
                </div>

                <div className='select-id'>
                    <input
                        // type='number'
                        placeholder='ID'
                        value={cityIdInput}
                        onChange={handleCityIdInputChange}
                    />
                    <select value={cityId} onChange={handleCityChange}>
                        <option value={0} disabled>Selecione uma Cidade</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='field'>
                <button onClick={handleAddress} disabled={!filledFields}>Confirmar</button>
            </div>
        </Body>
    );
}