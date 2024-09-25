const db = require('../config/db');

exports.getAllPayrolls = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM payroll order by created_at desc');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getPayrollById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM payroll WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Payroll not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createPayroll = async (req, res) => {
    const { amount, date, employee_id, num_installments, description, paid } = req.body;
    const query = 'INSERT INTO payroll (amount, date, num_installments, description, employee_id, paid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
    const values = [amount, date, num_installments, description, employee_id, paid];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Payroll.');
            return res.status(500).json({ error: 'Error while inserting Payroll.' });
        }

        const payrollId = result.rows[0].id;

        res.status(201).json({ message: 'Payroll created!', id: payrollId });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updatePayroll = async (req, res) => {
    const id = req.params.id;
    const { amount, date, num_installments, description, employee_id, paid } = req.body;
    const query = 'UPDATE payroll SET amount = $1, date = $2, num_installments = $3, description = $4, employee_id = $5, paid = $6 WHERE id = $7;';
    const values = [ amount, date, num_installments, description, employee_id, paid, id ];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Payroll.');
            return res.status(500).json({ error: 'Error while updating Payroll.' });
        }

        res.status(201).json({ message: 'Payroll updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}