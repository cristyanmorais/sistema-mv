import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout';
import CityForm from '../forms/CityForm';
import { useCityForm } from '../../hooks/useCityForm';

const CityEdit = () => {
    const { id } = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {
        formData,
        loading,
        error,
        handleSubmit,
        handleDelete,
        handleChange
    } = useCityForm('edit', id);

    return (
        <Layout>
            <h1>Editar Cidade</h1>
            <CityForm
                formData={formData}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                handleChange={handleChange}
                mode="edit"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </Layout>
    );
};

export default CityEdit; 