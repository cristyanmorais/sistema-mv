const db = require('../config/db');

exports.getAllCashRegisters = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM cash_register');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getCashRegisterById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM cash_register WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Cash Register not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createCashRegister = async (req, res) => {
    const { transaction_type, transaction_id, transaction_date, amount, balance } = req.body;
    const query = 'INSERT INTO cash_register (transaction_type, transaction_id, transaction_date, amount, balance) VALUES ($1, $2, $3, $4, $5);';
    const values = [transaction_type, transaction_id, transaction_date, amount, balance];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Cash Register.');
            return res.status(500).json({ error: 'Error while inserting Cash Register.' });
        }

        res.status(201).json({ message: 'Cash Register created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateCashRegister = async (req, res) => {
    const id = req.params.id;
    const { transaction_type, transaction_id, transaction_date, amount, balance } = req.body;
    const query = 'UPDATE cash_register SET transaction_type = $1, transaction_id = $2, transaction_date = $3, amount = $4, balance = $5 WHERE id = $6;';
    const values = [transaction_type, transaction_id, transaction_date, amount, balance, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Cash Register.');
            return res.status(500).json({ error: 'Error while updating Cash Register.' });
        }

        res.status(201).json({ message: 'Cash Register updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}