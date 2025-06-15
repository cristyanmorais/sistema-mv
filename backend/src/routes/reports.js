const express = require('express');
const router = express.Router();
const ExcelJS = require('exceljs');
const db = require('../config/db');

router.get('/monthly', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Datas de início e fim são obrigatórias' });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Relatório');

        // Mapeamento dos tipos de transação para português
        const transactionTypes = {
            'contracted_services': 'Serviços Contratados',
            'payroll': 'Folha de Pagamento',
            'provided_services': 'Serviços Prestados',
            'purchases': 'Compras',
            'sales': 'Vendas',
            'taxes': 'Impostos'
        };

        // Configurar cabeçalhos
        worksheet.columns = [
            { header: 'Tipo de Transação', key: 'type', width: 20 },
            { header: 'Data', key: 'date', width: 15 },
            { header: 'Valor', key: 'amount', width: 15 },
            { header: 'Descrição', key: 'description', width: 40 },
            { header: '', key: 'empty1', width: 10 },
            { header: 'Resumo', key: 'resumo', width: 20 },
            { header: 'Valor', key: 'valor', width: 15 }
        ];

        // Estilizar cabeçalhos
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

        // Função para buscar transações de uma tabela específica
        const fetchTransactions = async (tableName) => {
            const query = `
                SELECT t.*, 
                       CASE 
                           WHEN t.num_installments > 1 THEN i.installment_amount 
                           ELSE t.amount 
                       END as final_amount,
                       CASE 
                           WHEN t.num_installments > 1 THEN i.due_date 
                           ELSE t.date 
                       END as transaction_date
                FROM ${tableName} t
                LEFT JOIN installments i ON i.transaction_type = '${tableName}' 
                    AND i.transaction_id = t.id 
                    AND i.paid = true
                    AND i.due_date BETWEEN $1 AND $2
                WHERE t.paid = true 
                AND (
                    (t.num_installments > 1 AND i.id IS NOT NULL)
                    OR 
                    (t.num_installments = 1 AND t.date BETWEEN $1 AND $2)
                )
            `;
            return await db.query(query, [startDate, endDate]);
        };

        // Buscar transações de todas as tabelas
        const tables = [
            'contracted_services',
            'payroll',
            'provided_services',
            'purchases',
            'sales',
            'taxes'
        ];

        let totalEntradas = 0;
        let totalSaidas = 0;
        let allTransactions = [];

        // Coletar todas as transações
        for (const table of tables) {
            const result = await fetchTransactions(table);
            for (const row of result.rows) {
                const valor = parseFloat(row.final_amount);
                
                // Somar ao total apropriado
                if (table === 'provided_services' || table === 'sales') {
                    totalEntradas += valor;
                } else {
                    totalSaidas += valor;
                }

                allTransactions.push({
                    type: transactionTypes[table],
                    date: new Date(row.transaction_date),
                    amount: valor,
                    description: row.description
                });
            }
        }

        // Ordenar todas as transações por data
        allTransactions.sort((a, b) => a.date - b.date);

        // Adicionar transações ordenadas ao worksheet
        allTransactions.forEach(transaction => {
            worksheet.addRow({
                type: transaction.type,
                date: transaction.date.toLocaleDateString(),
                amount: transaction.amount,
                description: transaction.description
            });
        });

        // Buscar o caixa atual
        const caixaResult = await db.query('SELECT balance FROM cash_register ORDER BY id DESC LIMIT 1');
        const caixaAtual = parseFloat(caixaResult.rows[0]?.balance || 0);

        // Adicionar totais ao lado
        const rowTotalEntradas = worksheet.getRow(2);
        rowTotalEntradas.getCell('resumo').value = 'Total Entradas';
        rowTotalEntradas.getCell('valor').value = totalEntradas.toFixed(2);
        rowTotalEntradas.getCell('resumo').font = { bold: true };
        rowTotalEntradas.getCell('valor').font = { bold: true };
        rowTotalEntradas.getCell('resumo').alignment = { horizontal: 'right' };
        rowTotalEntradas.getCell('valor').alignment = { horizontal: 'right' };

        const rowTotalSaidas = worksheet.getRow(3);
        rowTotalSaidas.getCell('resumo').value = 'Total Saídas';
        rowTotalSaidas.getCell('valor').value = totalSaidas.toFixed(2);
        rowTotalSaidas.getCell('resumo').font = { bold: true };
        rowTotalSaidas.getCell('valor').font = { bold: true };
        rowTotalSaidas.getCell('resumo').alignment = { horizontal: 'right' };
        rowTotalSaidas.getCell('valor').alignment = { horizontal: 'right' };

        const rowSaldoMensal = worksheet.getRow(4);
        rowSaldoMensal.getCell('resumo').value = 'Saldo do Período';
        rowSaldoMensal.getCell('valor').value = (totalEntradas - totalSaidas).toFixed(2);
        rowSaldoMensal.getCell('resumo').font = { bold: true };
        rowSaldoMensal.getCell('valor').font = { bold: true };
        rowSaldoMensal.getCell('resumo').alignment = { horizontal: 'right' };
        rowSaldoMensal.getCell('valor').alignment = { horizontal: 'right' };

        const rowCaixaAtual = worksheet.getRow(5);
        rowCaixaAtual.getCell('resumo').value = 'Caixa Atual';
        rowCaixaAtual.getCell('valor').value = caixaAtual.toFixed(2);
        rowCaixaAtual.getCell('resumo').font = { bold: true };
        rowCaixaAtual.getCell('valor').font = { bold: true };
        rowCaixaAtual.getCell('resumo').alignment = { horizontal: 'right' };
        rowCaixaAtual.getCell('valor').alignment = { horizontal: 'right' };

        // Configurar resposta
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=relatorio.xlsx'
        );

        // Enviar arquivo
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        res.status(500).json({ error: 'Erro ao gerar relatório' });
    }
});

module.exports = router; 