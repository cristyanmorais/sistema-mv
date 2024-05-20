const db = require('../config/db');

exports.getAllSalesInstallments = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM sales_installments');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getSalesInstallmentById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM sales_installments WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Sales Installment not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Adicionar Telefone e Email caso necesário
exports.createSalesInstallment = async (req, res) => {
    const { sale_id, installment_amount, due_date, paid, payment_date } = req.body;
    const query = 'INSERT INTO sales_installments (sale_id, installment_amount, due_date, paid, payment_date) VALUES ($1, $2, $3, $4, $5);';
    const values = [sale_id, installment_amount, due_date, paid, payment_date];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Sales Installment.');
            return res.status(500).json({ error: 'Error while inserting Sales Installment.' });
        }

        res.status(201).json({ message: 'Sales Installment created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateSalesInstallment = async (req, res) => {
    const id = req.params.id;
    const { sale_id, installment_amount, due_date, paid, payment_date } = req.body;
    const query = 'UPDATE sales_installments SET sale_id = $1, installment_amount = $2, due_date = $3, paid = $4, payment_date = $5 WHERE id = $6;';
    const values = [sale_id, installment_amount, due_date, paid, payment_date, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Sales Installment.');
            return res.status(500).json({ error: 'Error while updating Sales Installment.' });
        }

        res.status(201).json({ message: 'Sales Installment updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}