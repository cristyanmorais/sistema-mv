const db = require('../config/db');

exports.getAllEmployees = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM employees');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM employees WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Employee not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createEmployee = async (req, res) => {
    const { name, cpf } = req.body;
    const query = 'INSERT INTO employees (name, cpf) VALUES ($1, $2);';
    const values = [name, cpf];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Employee.');
            return res.status(500).json({ error: 'Error while inserting Employee.' });
        }

        res.status(201).json({ message: 'Employee created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateEmployee = async (req, res) => {
    const id = req.params.id;
    const { name, cpf } = req.body;
    const query = 'UPDATE employees SET name = $1, cpf = $2 WHERE id = $3;';
    const values = [name, cpf, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Employee.');
            return res.status(500).json({ error: 'Error while updating Employee.' });
        }

        res.status(201).json({ message: 'Employee updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}