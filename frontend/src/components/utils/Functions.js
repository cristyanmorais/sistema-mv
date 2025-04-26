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

export const handlePhoneChange = (input, setPhone) => {
    const numericPhone = input.replace(/\D/g, '');
    if (numericPhone.length <= 11) {
        setPhone(numericPhone);
    }
};

export const textNumber = (input, set, size) => {
    const numericText = input.replace(/\D/g, '');
    if (numericText.length <= size) {
        set(numericText);
    }
};

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value || 0);
};