import styled from "styled-components";

export const Body = styled.div`
        background-color: #212139;
        width: 80%;
        // height: 650px;
        margin: auto;
        margin-top: 50px;
        color: #fff;
        border-radius: 50px;

        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .field {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100px;
        }

        .installment-field {
            display: flex;
            justify-content: space-around;
            margin: 0 100px;
        }

        label {
            font-size: 25px;
        }

        select {
            font-size: 15px;
            width: 300px;
            margin: auto;
            height: 30px;
            text-align: center;
            border-radius: 30px;
        }

        input:not(.check-box) {
            font-size: 15px;
            width: 300px;
            margin: auto;
            height: 30px;
            text-align: center;
            border-radius: 30px;
        }

        input[type="checkbox"] {
            display: none;
        }

        .checkbox-custom {
            margin-left: 20px;
            display: inline-block;
            width: 30px;
            height: 30px;
            background-color: #fff;
            border: 5px solid #fff;
            border-radius: 50%;
            cursor: pointer;
            transition: background-color 0.3s, border-color 0.3s;
        }

        .checkbox-custom:hover {
            background-color: #e0c858;
        }

        input[type="checkbox"]:checked + .checkbox-custom {
            background-color: #e0c858;
            border-color: #fff;
        }

        button {
            // height: 30px;
            padding: 10px 30px;
            font-size: 20px;
            border-radius: 30px;
            margin-top: 20px;
        }
`;