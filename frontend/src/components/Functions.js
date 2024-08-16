export const getFormattedDate = (date) => {
    return date.substring(8, 10) + "-" + date.substring(5, 7) + "-" + date.substring(0, 4);
};

export const getTransactionTypeLabel = (type) => {
    switch(type) {
        case 'purchases':
            return 'Compra';
        case 'sales':
            return 'Venda';
        case 'taxes':
            return 'Imposto';
        case 'payroll':
            return 'Folha de Pagamento';
        case 'provided-services':
            return 'Serviços Prestados';
        case 'contracted-services':
            return 'Serviços Contratados';
        default:
            return 'Outro';
    }
}