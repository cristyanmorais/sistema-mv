const db = require('../config/db');

exports.getAllClients = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM clients');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getClientById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM clients WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Client not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Adicionar Telefone e Email caso necesário
exports.createClient = async (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO clients (name) VALUES ($1);';
    const values = [name];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Client.');
            return res.status(500).json({ error: 'Error while inserting Client.' });
        }

        res.status(201).json({ message: 'Client created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateClient = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const query = 'UPDATE companies SET name = $1 WHERE id = $2;';
    const values = [name, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Client.');
            return res.status(500).json({ error: 'Error while updating Client.' });
        }

        res.status(201).json({ message: 'Client updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}