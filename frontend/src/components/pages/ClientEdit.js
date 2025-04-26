import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout';
import ClientForm from '../forms/ClientForm';
import { useClientForm } from '../../hooks/useClientForm';

const ClientEdit = () => {
    const { id } = useParams();
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
    } = useClientForm('edit', id);

    return (
        <Layout>
            <h1>Editar Cliente</h1>
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
                mode="edit"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </Layout>
    );
};

export default ClientEdit; 