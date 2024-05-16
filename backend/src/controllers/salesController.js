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