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
    const { name, cpf, phone, email, address_id } = req.body;
    const query = 'INSERT INTO employees (name, cpf, phone, email, address_id) VALUES ($1, $2, $3, $4, $5);';
    const values = [name, cpf, phone, email, address_id];
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
    const { name, cpf, phone, email, address_id } = req.body;
    const query = 'UPDATE employees SET name = $1, cpf = $2, phone = $3, email = $4, address_id = $5 WHERE id = $6;';
    const values = [name, cpf, phone, email, address_id, id];
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

exports.deleteEmployee = async (req, res) => {
    const id = req.params.id;
    const query = 'UPDATE employees SET is_active = false WHERE id = $1;';
    
    try {
        const result = await db.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        res.status(200).json({ message: 'Employee deactivated successfully.' });

    } catch (err) {
        res.status(500).send(err.message);
    }
};