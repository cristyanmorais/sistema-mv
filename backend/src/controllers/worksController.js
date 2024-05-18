const db = require('../config/db');

exports.getAllWorks = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM works');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getWorkById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM works WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Work not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createWork = async (req, res) => {
    const { name, address } = req.body;
    const query = 'INSERT INTO works(name, address) VALUES ($1, $2);';
    const values =  [name, address];

    try {
        const result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Work.');
            return res.status(500).json({ error: 'Error while inserting Work.' });
        }

        res.status(201).json({ message: 'Work created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}