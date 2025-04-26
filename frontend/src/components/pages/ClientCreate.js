import React, { useState } from 'react';
import Layout from '../Layout';
import ClientForm from '../forms/ClientForm';
import { useClientForm } from '../../hooks/useClientForm';

const ClientCreate = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {
        formData,
        cities,
        loading,
        error,
        cityIdInput,
        handleSubmit,
        handleDelete,
        handleChange,
        handlePhoneChange,
        handleZipCodeChange,
        handleNumberChange,
        handleCityChange,
        handleCityIdInputChange
    } = useClientForm('create');

    return (
        <Layout>
            <h1>Criar Cliente</h1>
            <ClientForm
                formData={formData}
                cities={cities}
                loading={loading}
                error={error}
                cityIdInput={cityIdInput}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                handleChange={handleChange}
                handlePhoneChange={handlePhoneChange}
                handleZipCodeChange={handleZipCodeChange}
                handleNumberChange={handleNumberChange}
                handleCityChange={handleCityChange}
                handleCityIdInputChange={handleCityIdInputChange}
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </Layout>
    );
};

export default ClientCreate; 