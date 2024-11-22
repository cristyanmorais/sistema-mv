const db = require('../config/db');

exports.getAllCashRegisters = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM cash_register ORDER BY id desc');
        res.json(result.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getCashRegisterById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM cash_register WHERE id = $1', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).send('Cash Register not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.getCashRegisterTransactions = async (req, res) => {
    try {
        let negative = 0;
        let positive = 0;
        const result = await db.query('SELECT * FROM cash_register');

        for (row in result.rows) {
            if (result.rows[row].transaction_type === "contracted-services" || result.rows[row].transaction_type === "payroll" || result.rows[row].transaction_type === "purchases" || result.rows[row].transaction_type === "taxes") {
                negative += Number(result.rows[row].amount);
            } else {
                positive += Number(result.rows[row].amount);
            }
        }

        const json = {
            "negative": negative,
            "positive": positive
        }

        res.json(json);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.createCashRegister = async (req, res) => {
    const { transaction_type, transaction_id, transaction_date, amount } = req.body;
    try {
        // Obter o saldo anterior
        const lastBalance = await getLastBalance();
        // console.log("Last Balance: " + lastBalance);

        // Calcular o novo saldo
        let balance;
        if (transaction_type === "contracted-services" || transaction_type === "payroll" || transaction_type === "purchases" || transaction_type === "taxes") {
            balance = lastBalance - amount; // Despesa
            // console.log("- Balance: " + balance);
        } else {
            balance = Number(lastBalance) + Number(amount); // Receita
            // console.log("+ Balance: " + balance);
        }

        // Inserir a nova transação com o saldo atualizado
        const query = 'INSERT INTO cash_register (transaction_type, transaction_id, transaction_date, amount, balance) VALUES ($1, $2, $3, $4, $5)';
        const values = [transaction_type, transaction_id, transaction_date, amount, balance];
        
        const result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while inserting Cash Register.');
            return res.status(500).json({ error: 'Error while inserting Cash Register.' });
        }

        res.status(201).json({ message: 'Cash Register created!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateCashRegister = async (req, res) => {
    const id = req.params.id;
    const { transaction_type, transaction_id, transaction_date, amount, balance } = req.body;
    const query = 'UPDATE cash_register SET transaction_type = $1, transaction_id = $2, transaction_date = $3, amount = $4, balance = $5 WHERE id = $6;';
    const values = [transaction_type, transaction_id, transaction_date, amount, balance, id];
    try {
        result = await db.query(query, values);

        if (result.rowCount !== 1) {
            console.error('Error while updating Cash Register.');
            return res.status(500).json({ error: 'Error while updating Cash Register.' });
        }

        res.status(201).json({ message: 'Cash Register updated!' });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getLastBalance = async () => {
    const result = await db.query('SELECT balance FROM cash_register ORDER BY id DESC LIMIT 1');
    if (result.rows.length > 0) {
        return result.rows[0].balance;
    }

    return 0; // Se não houver registros, o saldo inicial é 0
};