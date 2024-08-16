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
    const { client_id, amount, description, date, num_installments, paid } = req.body;
    const query = 'INSERT INTO provided_services (client_id, amount, description, date, num_installments, paid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
    const values = [client_id, amount, description, date, num_installments, paid];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Provided Service.');
            return res.status(500).json({ error: 'Error while inserting Provided Service.' });
        }

        const providedServiceId = result.rows[0].id;

        res.status(201).json({ message: 'Provided Service created!', id: providedServiceId });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateProvidedService = async (req, res) => {
    const id = req.params.id;
    const { client_id, amount, description, date, num_installments, paid } = req.body;
    const query = 'UPDATE provided_services SET client_id = $1, amount = $2, description = $3, date = $4, num_installments = $5, paid = $6 WHERE id = $7;';
    const values = [client_id, amount, description, date, num_installments, paid, id];
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