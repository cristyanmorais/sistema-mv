const db = require('../config/db');

exports.getAllInstallments = async (req, res) => {
    const { transactionType, paid } = req.query;

    try {
        let query = 'SELECT * FROM installments WHERE TRUE';
        const values = [];

        if (transactionType) {
            query += ` AND transaction_type = $${values.length + 1}`;
            values.push(transactionType);
        }

        if (typeof paid !== 'undefined' && paid !== '') {
            query += ` AND paid = $${values.length + 1}`;
            values.push(paid === 'true');
        }

        query += ' ORDER BY due_date';

        const result = await db.query(query, values);
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getInstallmentById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM installments WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send(' Installment not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.getNextInstallment = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM installments where paid = false order by due_date');
        
        if (result.rows.length === 0) {
            return res.status(404).send(' Installment not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.getTransactionValue = async (req, res) => {
    try {
        const { transaction_type, transaction_id } = req.query;
        // console.log("Transaction Type: ", transaction_type);
        // console.log("Transaction ID: ", transaction_id);

        const validTransactionTypes = ['sales', 'purchases', 'taxes', 'contracted_services', 'provided_services', 'payroll'];
        if (!validTransactionTypes.includes(transaction_type)) {
            return res.status(400).send('Invalid transaction type');
        }

        const query = `SELECT amount FROM ${transaction_type} WHERE id = $1`;
        const values = [transaction_id];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).send('Amount not found');
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error in getTransactionValue:", err.message);
        res.status(500).send(err.message);
    }
};

// Adicionar Telefone e Email caso necesário
exports.createInstallment = async (req, res) => {
    const { transaction_id, transaction_type, installment_amount, due_date, paid, payment_date } = req.body;
    const query = 'INSERT INTO installments (transaction_id, transaction_type, installment_amount, due_date, paid, payment_date) VALUES ($1, $2, $3, $4, $5, $6);';
    const values = [transaction_id, transaction_type, installment_amount, due_date, paid, payment_date];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting  Installment.');
            return res.status(500).json({ error: 'Error while inserting  Installment.' });
        }

        res.status(201).json({ message: ' Installment created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateInstallment = async (req, res) => {
    const id = req.params.id;
    const { transaction_id, transaction_type, installment_amount, due_date, paid } = req.body;
    const query = 'UPDATE installments SET transaction_id = $1, transaction_type = $2, installment_amount = $3, due_date = $4, paid = $5 WHERE id = $6;';
    const values = [transaction_id, transaction_type, installment_amount, due_date, paid, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating  Installment.');
            return res.status(500).json({ error: 'Error while updating  Installment.' });
        }

        res.status(201).json({ message: ' Installment updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

// exports.updateInstallmentPaid = async (req, res) => {
//     const id = req.params.id;
//     const query = 'UPDATE installments SET paid = true WHERE id = $1;';
//     const values = [id];
//     try {
//         result = await db.query(query, values);

//         if (result.rowCount !== 1) {
//             console.error('Error while updating  Installment.');
//             return res.status(500).json({ error: 'Error while updating  Installment.' });
//         }

//         res.status(201).json({ message: ' Installment updated!' });

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// }