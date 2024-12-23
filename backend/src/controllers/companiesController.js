const db = require('../config/db');

exports.getAllCompanies = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM companies');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getCompanyById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM companies WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Company not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createCompany = async (req, res) => {
    const { cnpj, real_name, fantasy_name, phone, email, address_id } = req.body;
    const query = 'INSERT INTO companies (cnpj, real_name, fantasy_name, phone, email, address_id) VALUES ($1, $2, $3, $4, $5, $6);';
    const values = [cnpj, real_name, fantasy_name, phone, email, address_id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Company.');
            return res.status(500).json({ error: 'Error while inserting Company.' });
        }

        res.status(201).json({ message: 'Company created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateCompany = async (req, res) => {
    const id = req.params.id;
    const { cnpj, real_name, fantasy_name, phone, email, address_id } = req.body;
    const query = 'UPDATE companies SET cnpj = $1, real_name = $2, fantasy_name = $3, phone = $4, email = $5, address_id = $6 WHERE id = $7;';
    const values = [cnpj, real_name, fantasy_name, phone, email, address_id, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Company.');
            return res.status(500).json({ error: 'Error while updating Company.' });
        }

        res.status(201).json({ message: 'Company updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}