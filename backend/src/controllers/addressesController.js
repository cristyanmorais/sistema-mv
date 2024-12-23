const db = require('../config/db');

exports.getAllAddresses = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM addresses order by created_at desc');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getAddressById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM addresses WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Address not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createAddress = async (req, res) => {
    const { address_line_1, address_line_2, zip_code, city_id, number } = req.body;
    const query = 'INSERT INTO addresses (address_line_1, address_line_2, zip_code, city_id, number) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
    const values = [address_line_1, address_line_2, zip_code, city_id, number];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Address.');
            return res.status(500).json({ error: 'Error while inserting Address.' });
        }

        const addressesId = result.rows[0].id;

        res.status(201).json({ message: 'Address created!', id: addressesId });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateAddress = async (req, res) => {
    const id = req.params.id;
    const { address_line_1, address_line_2, zip_code, city_id, number } = req.body;
    const query = 'UPDATE addresses SET address_line_1 = $1, address_line_2 = $2, zip_code = $3, city_id = $4, number = $5 WHERE id = $6;';
    const values = [address_line_1, address_line_2, zip_code, city_id, number, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Address.');
            return res.status(500).json({ error: 'Error while updating Address.' });
        }

        res.status(201).json({ message: 'Address updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}