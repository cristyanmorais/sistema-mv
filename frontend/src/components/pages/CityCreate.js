import React, { useState } from 'react';
import Layout from '../Layout';
import CityForm from '../forms/CityForm';
import { useCityForm } from '../../hooks/useCityForm';

const CityCreate = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {
        formData,
        loading,
        error,
        handleSubmit,
        handleDelete,
        handleChange
    } = useCityForm('create');

    return (
        <Layout>
            <h1>Criar Cidade</h1>
            <CityForm
                formData={formData}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                handleChange={handleChange}
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </Layout>
    );
};

export default CityCreate; 