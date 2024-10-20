import React from 'react';
import './visualComponents.css';

export const Card = ({ title, content }) => {
    return (
        <div className="card">
            <p>{title}</p>
            <p>R$ {content}</p>
        </div>
    )
}

export const InstCard = ({ onClick, content }) => {
    return (
        <div className='inst-card' onClick={onClick}>
            <p>Próxima Parcela:</p>
            <p>{content}</p>
        </div>
    )
}