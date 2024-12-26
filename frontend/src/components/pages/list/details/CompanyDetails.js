export const Companies = () => {
    const [realName, setRealName] = useState('');
    const [fantasyName, setFantasyName] = useState('');
    const [cnpj, setCnpj] = useState('');

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
        if (realName !== '' && fantasyName !== '' && cnpj.length === 14 && addressLine1 !== '' && zipCode !== '' && cityId !== 0 && number !== '') {
            setFilledFields(true);
        } else {
            setFilledFields(false);
        }
    }, [realName, fantasyName, cnpj, addressLine1, zipCode, cityId, number])

    const handleCnpjChange = (e) => {
        const input = e.target.value;
        const numericCnpj = input.replace(/\D/g, '');

        if (numericCnpj.length <= 14) {
            setCnpj(numericCnpj);
        }
    };

    const handleConfirm = (addressId) =>  {
        const data = {
            cnpj,
            real_name: realName,
            fantasy_name: fantasyName,
            address_id: addressId
        }

        axios.post(`${BASE_URL}/api/companies`, data)
        .catch(error => {
            console.error("Error while creating Company: ", error);
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
        setRealName('');
        setFantasyName('');
        setCnpj('');
        setAddressLine1('');
        setAddressLine2('');
        setZipCode('');
        setCityId(0);
        setNumber('');
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