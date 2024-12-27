const db = require('../config/db');

exports.getAllCities = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM cities WHERE is_active = true order by created_at desc');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getCityById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM cities WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('City not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createCity = async (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO cities (name) VALUES ($1) RETURNING id;';
    const values = [name];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting City.');
            return res.status(500).json({ error: 'Error while inserting City.' });
        }

        const citiesId = result.rows[0].id;

        res.status(201).json({ message: 'City created!', id: citiesId });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateCity = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const query = 'UPDATE cities SET name = $1 WHERE id = $2;';
    const values = [name, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating City.');
            return res.status(500).json({ error: 'Error while updating City.' });
        }

        res.status(201).json({ message: 'City updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.deleteCity = async (req, res) => {
    const id = req.params.id;
    const query = 'UPDATE cities SET is_active = false WHERE id = $1;';
    
    try {
        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'City not found.' });
        }

        res.status(200).json({ message: 'City deactivated successfully.' });

    } catch (err) {
        res.status(500).send(err.message);
    }
};