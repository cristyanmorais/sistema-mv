const db = require('../config/db');

exports.getAllPurchasesInstallments = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM purchases_installments');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getPurchasesInstallmentById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM purchases_installments WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Purchases Installment not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Adicionar Telefone e Email caso necesário
exports.createPurchasesInstallment = async (req, res) => {
    const { purchase_id, installment_amount, due_date, paid, payment_date } = req.body;
    const query = 'INSERT INTO purchases_installments (purchase_id, installment_amount, due_date, paid, payment_date) VALUES ($1, $2, $3, $4, $5);';
    const values = [purchase_id, installment_amount, due_date, paid, payment_date];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Purchases Installment.');
            return res.status(500).json({ error: 'Error while inserting Purchases Installment.' });
        }

        res.status(201).json({ message: 'Purchases Installment created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updatePurchasesInstallment = async (req, res) => {
    const id = req.params.id;
    const { purchase_id, installment_amount, due_date, paid, payment_date } = req.body;
    const query = 'UPDATE purchases_installments SET purchase_id = $1, installment_amount = $2, due_date = $3, paid = $4, payment_date = $5 WHERE id = $6;';
    const values = [purchase_id, installment_amount, due_date, paid, payment_date, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Purchases Installment.');
            return res.status(500).json({ error: 'Error while updating Purchases Installment.' });
        }

        res.status(201).json({ message: 'Purchases Installment updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}