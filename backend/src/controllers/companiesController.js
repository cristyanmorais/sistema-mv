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
    const { cnpj, real_name, fantasy_name } = req.body;
    const query = 'INSERT INTO companies (cnpj, real_name, fantasy_name) VALUES ($1, $2, $3);';
    const values = [cnpj, real_name, fantasy_name];
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
    const { cnpj, real_name, fantasy_name } = req.body;
    const query = 'UPDATE companies SET cnpj = $1, real_name = $2, fantasy_name = $3 WHERE id = $4;';
    const values = [cnpj, real_name, fantasy_name, id];
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