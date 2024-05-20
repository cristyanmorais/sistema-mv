const db = require('../config/db');

exports.getAllProvidedServices = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM provided_services');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getProvidedServiceById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM provided_services WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Provided Service not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createProvidedService = async (req, res) => {
    const { client_id, amount, description, service_date } = req.body;
    const query = 'INSERT INTO provided_services (client_id, amount, description, service_date) VALUES ($1, $2, $3, $4);';
    const values = [client_id, amount, description, service_date];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Provided Service.');
            return res.status(500).json({ error: 'Error while inserting Provided Service.' });
        }

        res.status(201).json({ message: 'Provided Service created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateProvidedService = async (req, res) => {
    const id = req.params.id;
    const { client_id, amount, description, service_date } = req.body;
    const query = 'UPDATE provided_services SET client_id = $1, amount = $2, description = $3, service_date = $4 WHERE id = $5;';
    const values = [client_id, amount, description, service_date, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Provided Service.');
            return res.status(500).json({ error: 'Error while updating Provided Service.' });
        }

        res.status(201).json({ message: 'Provided Service updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}