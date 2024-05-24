const db = require('../config/db');

exports.getAllPayrolls = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM payroll');
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

// Adicionar Telefone e Email caso necesário
exports.createPayroll = async (req, res) => {
    const { amount, payroll_date } = req.body;
    const query = 'INSERT INTO payroll (amount, payroll_date) VALUES ($1, $2) RETURNING id;';
    const values = [amount, payroll_date];
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
    const { amount, payroll_date } = req.body;
    const query = 'UPDATE payroll SET amount = $1, payroll_date = $2 WHERE id = $3;';
    const values = [ amount, payroll_date, id];
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