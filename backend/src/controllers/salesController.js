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
    const { work_id, amount, date, num_installments, description, paid } = req.body;
    const query = 'INSERT INTO sales (work_id, amount, date, num_installments, description, paid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
    const values = [work_id, amount, date, num_installments, description, paid];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Work.');
            return res.status(500).json({ error: 'Error while inserting Work.' });
        }

        const saleId = result.rows[0].id;

        // console.log(result.rows[0]);

        res.status(201).json({ message: 'Sale created!', id: saleId});

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateSale = async (req, res) => {
    const id = req.params.id;
    const { work_id, amount, date, num_installments, description, paid } = req.body;
    const query = 'UPDATE payroll SET work_id = $1, amount = $2, description = $3, date = $4, num_installments = $5, paid = $6 WHERE id = $7;';
    const values = [ work_id, amount, date, num_installments, description, paid, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Sale.');
            return res.status(500).json({ error: 'Error while updating Sale.' });
        }

        res.status(201).json({ message: 'Sale updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}