const db = require('../config/db');

exports.getAllDistricts = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM districts order by created_at desc');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getDistrictById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM districts WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('District not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createDistrict = async (req, res) => {
    const { name, city_id } = req.body;
    const query = 'INSERT INTO districts (name, city_id) VALUES ($1, $2) RETURNING id;';
    const values = [name, city_id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting District.');
            return res.status(500).json({ error: 'Error while inserting District.' });
        }

        const districtsId = result.rows[0].id;

        res.status(201).json({ message: 'District created!', id: districtsId });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateDistrict = async (req, res) => {
    const id = req.params.id;
    const { name, city_id } = req.body;
    const query = 'UPDATE districts SET name = $1, city_id = $2 WHERE id = $3;';
    const values = [name, city_id, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating District.');
            return res.status(500).json({ error: 'Error while updating District.' });
        }

        res.status(201).json({ message: 'District updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}