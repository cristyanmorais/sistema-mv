const db = require('../config/db');

exports.getAllPurchases = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM purchases');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getPurchaseById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM purchases WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Purchase not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createPurchase = async (req, res) => {
    const { company_id, amount, description, date, num_installments, paid } = req.body;
    const query = 'INSERT INTO purchases (company_id, amount, description, date, num_installments, paid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
    const values = [company_id, amount, description, date, num_installments, paid];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Purchase.');
            return res.status(500).json({ error: 'Error while inserting Purchase.' });
        }

        const purchaseId = result.rows[0].id;

        res.status(201).json({ message: 'Purchase created!', id: purchaseId});

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updatePurchase = async (req, res) => {
    const id = req.params.id;
    const { company_id, amount, description, date, num_installments, paid } = req.body;
    const query = 'UPDATE payroll SET company_id = $1, amount = $2, description = $3, date = $4, num_installments = $5, paid = $6 WHERE id = $7;';
    const values = [ company_id, amount, description, date, num_installments, paid, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Purchase.');
            return res.status(500).json({ error: 'Error while updating Purchase.' });
        }

        res.status(201).json({ message: 'Purchase updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}