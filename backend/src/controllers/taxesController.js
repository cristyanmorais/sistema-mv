const db = require('../config/db');

exports.getAllTaxes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM taxes order by created_at desc');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getTaxById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM taxes WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Tax not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createTax = async (req, res) => {
    const { taxes_type_id, amount, date, num_installments, description, paid } = req.body;
    const query = 'INSERT INTO taxes (taxes_type_id, amount, date, num_installments, description, paid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
    const values = [taxes_type_id, amount, date, num_installments, description, paid];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Tax.');
            return res.status(500).json({ error: 'Error while inserting Tax.' });
        }

        const taxId = result.rows[0].id;

        res.status(201).json({ message: 'Tax created!', id: taxId });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateTax = async (req, res) => {
    const id = req.params.id;
    const { taxes_type_id, amount, date, num_installments, description, paid } = req.body;
    const query = 'UPDATE taxes SET taxes_type_id = $1, amount = $2, date = $3, num_installments = $4, description = $5, paid = $6 WHERE id = $7;';
    const values = [taxes_type_id, amount, date, num_installments, description, paid, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Tax.');
            return res.status(500).json({ error: 'Error while updating Tax.' });
        }

        res.status(201).json({ message: 'Tax updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateTaxPaid = async (req, res) => {
    const id = req.params.id;
    const { paid } = req.body; // apenas o campo 'paid' é necessário
    const query = 'UPDATE taxes SET paid = $1 WHERE id = $2;';
    const values = [paid, id];
    try {
        const result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Tax.');
            return res.status(500).json({ error: 'Error while updating Tax.' });
        }

        res.status(200).json({ message: 'Tax status updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
};