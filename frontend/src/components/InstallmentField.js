import React, { useState } from 'react';

const InstallmentField = ({ setInstallmentDate, setInstallmentAmount, setInstallmentNumber }) => {
    const [installment, setInstallment] = useState(false);

    return(
        <div>
            <div className='field'>
                <label>Parcelado:</label>
                <input id='checkbox' type='checkbox' checked={installment} onChange={(e) => setInstallment(e.target.checked)}/>
                <label htmlFor="checkbox" className="checkbox-custom"></label>
            </div>

            {installment ? 
            <div className='installment-field'>
                <div className='field'>
                    <label>Data da primeira parcela:</label>
                    <input type='date' onChange={e => setInstallmentDate(e.target.value)}/>
                </div>
                <div className='field'>
                    <label>Valor da primeira parcela:</label>
                    <input type='number' onChange={e => setInstallmentAmount(e.target.value)}/>
                </div>
                <div className='field'>
                    <label>Número de Parcelas:</label>
                    <input type='number' onChange={e => setInstallmentNumber(e.target.value)}/>
                </div>
            </div> 
            : null}
        </div>
    );
}

export default InstallmentField;