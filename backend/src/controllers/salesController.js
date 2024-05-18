const db = require('../config/db');

exports.getAllSales = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM sales');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getSaleById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM sales WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Sale not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createSale = async (req, res) => {
    const { work_id, amount, sale_date, is_installment } = req.body;
    const query = 'INSERT INTO sales (work_id, amount, sale_date, is_installment) VALUES ($1, $2, $3, $4);';
    const values = [work_id, amount, sale_date, is_installment];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Work.');
            return res.status(500).json({ error: 'Error while inserting Work.' });
        }

        res.status(201).json({ message: 'Sale created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}