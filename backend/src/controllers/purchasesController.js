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
    const { company_id, amount, description, purchase_date, is_installment } = req.body;
    const query = 'INSERT INTO purchases (company_id, amount, description, purchase_date, is_installment) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
    const values = [company_id, amount, description, purchase_date, is_installment];
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