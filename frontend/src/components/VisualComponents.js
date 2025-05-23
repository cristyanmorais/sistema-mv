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

export const InstCard = ({ onClick, content, date }) => {
    return (
        <div className='inst-card' onClick={onClick}>
            <h1>Próxima Parcela:</h1>
            <p>{content}</p>
            <p>{date}</p>
        </div>
    )
}