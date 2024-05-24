const db = require('../config/db');

exports.getAllTaxes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM taxes');
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
    const { taxes_type_id, amount, tax_date } = req.body;
    const query = 'INSERT INTO taxes (taxes_type_id, amount, tax_date) VALUES ($1, $2, $3) RETURNING id;';
    const values = [taxes_type_id, amount, tax_date];
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
    const { taxes_type_id, amount, tax_date } = req.body;
    const query = 'UPDATE taxes SET taxes_type_id = $1, amount = $2, tax_date = $3 WHERE id = $4;';
    const values = [taxes_type_id, amount, tax_date, id];
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