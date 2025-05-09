const { CashRegister } = require('../models');

exports.getAllCashRegisters = async (req, res) => {
    try {
        const cashRegisters = await CashRegister.findAll({
            order: [['id', 'DESC']]
        });
        res.json(cashRegisters);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getCashRegisterById = async (req, res) => {
    try {
        const cashRegister = await CashRegister.findByPk(req.params.id);
        
        if (!cashRegister) {
            return res.status(404).send('Cash Register not found');
        }

        res.json(cashRegister);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getCashRegisterTransactions = async (req, res) => {
    try {
        const cashRegisters = await CashRegister.findAll();
        
        let negative = 0;
        let positive = 0;

        cashRegisters.forEach(register => {
            if (['contracted-services', 'payroll', 'purchases', 'taxes'].includes(register.transaction_type)) {
                negative += Number(register.amount);
            } else {
                positive += Number(register.amount);
            }
        });

        res.json({
            negative,
            positive
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.createCashRegister = async (req, res) => {
    const { transaction_type, transaction_id, transaction_date, amount } = req.body;
    try {
        // Obter o saldo anterior
        const lastBalance = await getLastBalance();

        // Calcular o novo saldo
        let balance;
        if (['contracted-services', 'payroll', 'purchases', 'taxes'].includes(transaction_type)) {
            balance = lastBalance - amount; // Despesa
        } else {
            balance = Number(lastBalance) + Number(amount); // Receita
        }

        // Criar o novo registro
        const cashRegister = await CashRegister.create({
            transaction_type,
            transaction_id,
            transaction_date,
            amount,
            balance
        });

        res.status(201).json({ message: 'Cash Register created!', data: cashRegister });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateCashRegister = async (req, res) => {
    const { id } = req.params;
    const { transaction_type, transaction_id, transaction_date, amount, balance } = req.body;
    
    try {
        const cashRegister = await CashRegister.findByPk(id);
        
        if (!cashRegister) {
            return res.status(404).json({ error: 'Cash Register not found' });
        }

        await cashRegister.update({
            transaction_type,
            transaction_id,
            transaction_date,
            amount,
            balance
        });

        res.status(200).json({ message: 'Cash Register updated!', data: cashRegister });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getLastBalance = async () => {
    const lastRegister = await CashRegister.findOne({
        order: [['id', 'DESC']]
    });

    return lastRegister ? lastRegister.balance : 0;
};