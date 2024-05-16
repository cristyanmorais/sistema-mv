const db = require('../config/db');

exports.getTeste = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM works');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}