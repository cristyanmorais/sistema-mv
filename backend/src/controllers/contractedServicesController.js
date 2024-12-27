const db = require('../config/db');

exports.getAllContractedServices = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM contracted_services WHERE is_active = true ORDER BY created_at desc');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getContractedServiceById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM contracted_services WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Contracted Service not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createContractedService = async (req, res) => {
    const { employee_id, work_id, amount, description, date, num_installments, paid } = req.body;
    const query = 'INSERT INTO contracted_services (employee_id, work_id, amount, description, date, num_installments, paid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;';
    const values = [employee_id, work_id, amount, description, date, num_installments, paid];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Contracted Service.');
            return res.status(500).json({ error: 'Error while inserting Contracted Service.' });
        }

        const contractedServiceId = result.rows[0].id;

        res.status(201).json({ message: 'Contracted Service created!', id: contractedServiceId });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateContractedService = async (req, res) => {
    const id = req.params.id;
    const { employee_id, work_id, amount, description, date, num_installments, paid } = req.body;
    const query = 'UPDATE contracted_services SET employee_id = $1, work_id = $2, amount = $3, description = $4, date = $5, num_installments = $6, paid = $7 WHERE id = $8;';
    const values = [employee_id, work_id, amount, description, date, id, num_installments, paid];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Contracted Service.');
            return res.status(500).json({ error: 'Error while updating Contracted Service.' });
        }

        res.status(201).json({ message: 'Contracted Service updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateContractedServicePaid = async (req, res) => {
    const id = req.params.id;
    const { paid } = req.body; // apenas o campo 'paid' é necessário
    const query = 'UPDATE contracted_services SET paid = $1 WHERE id = $2;';
    const values = [paid, id];
    try {
        const result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating ContractedService.');
            return res.status(500).json({ error: 'Error while updating ContractedService.' });
        }

        res.status(200).json({ message: 'ContractedService status updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
};