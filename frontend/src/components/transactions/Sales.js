import React, { useState } from 'react';
import styled from 'styled-components';

const Sales = () => {
    const [workId, setWorkId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState();
    
    const Body = styled.div`
        background-color: lightgreen;
        width: 1000px;
        margin: auto;
        margin-top: 50px;

        display: flex;
        flex-direction: column;
    `

    return (
        <Body>
            <div>
                <label>Obra:</label>
                <select>
                
                </select>
            </div>
            <div>
                <label>Preço:</label>
                <input type='number' />
            </div>
            <div>
                <label>Data:</label>
                <input type='number' />
            </div>
        </Body>
    );
}

export default Sales;