const db = require('../config/db');

exports.getAllInstallments = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM installments');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getInstallmentById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM installments WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send(' Installment not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Adicionar Telefone e Email caso necesário
exports.createInstallment = async (req, res) => {
    const { transaction_id, transaction_type, installment_amount, due_date, paid, payment_date } = req.body;
    const query = 'INSERT INTO installments (transaction_id, transaction_type, installment_amount, due_date, paid, payment_date) VALUES ($1, $2, $3, $4, $5, $6);';
    const values = [transaction_id, transaction_type, installment_amount, due_date, paid, payment_date];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting  Installment.');
            return res.status(500).json({ error: 'Error while inserting  Installment.' });
        }

        res.status(201).json({ message: ' Installment created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateInstallment = async (req, res) => {
    const id = req.params.id;
    const { transaction_id, transaction_type, installment_amount, due_date, paid, payment_date } = req.body;
    const query = 'UPDATE installments SET transaction_id = $1, transaction_type = $2, installment_amount = $3, due_date = $4, paid = $5, payment_date = $6 WHERE id = $7;';
    const values = [transaction_id, transaction_type, installment_amount, due_date, paid, payment_date, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating  Installment.');
            return res.status(500).json({ error: 'Error while updating  Installment.' });
        }

        res.status(201).json({ message: ' Installment updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}