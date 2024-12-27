const db = require('../config/db');

exports.getAllClients = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM clients WHERE is_active = true ORDER BY id desc');
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
    const { name, phone, email, address_id } = req.body;
    const query = 'INSERT INTO clients (name, phone, email, address_id) VALUES ($1, $2, $3, $4);';
    const values = [name, phone, email, address_id];
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
    const { name, phone, email, address_id } = req.body;
    const query = 'UPDATE clients SET name = $1, phone = $2, email = $3, address_id = $4 WHERE id = $5;';
    const values = [name, phone, email, address_id, id];
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

exports.deleteClient = async (req, res) => {
    const id = req.params.id;
    const query = 'UPDATE clients SET is_active = false WHERE id = $1;';
    
    try {
        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Client not found.' });
        }

        res.status(200).json({ message: 'Client deactivated successfully.' });

    } catch (err) {
        res.status(500).send(err.message);
    }
};