const db = require('../config/db');

exports.getAllSales = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM sales WHERE is_active = true ORDER BY created_at desc');
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
    const query = 'UPDATE sales SET work_id = $1, amount = $2, date = $3, num_installments = $4, description = $5, paid = $6 WHERE id = $7;';
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

exports.updateSalePaid = async (req, res) => {
    const id = req.params.id;
    const { paid } = req.body; // apenas o campo 'paid' é necessário
    const query = 'UPDATE sales SET paid = $1 WHERE id = $2;';
    const values = [paid, id];
    try {
        const result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Sale.');
            return res.status(500).json({ error: 'Error while updating Sale.' });
        }

        res.status(200).json({ message: 'Sale status updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
};