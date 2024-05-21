const db = require('../config/db');

exports.getAllTaxesTypes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM taxes_type');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getTaxesTypeById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM taxes_type WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Taxes Type not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}