import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import './list.css';
import Layout from '../../Layout';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Table = styled.table`
  tr:not(.title-row) {
    cursor: pointer;
  }
  th {
    border-bottom: 2px solid #212139;
  }
  .odd {
    background-color: lightgrey;
  }
`;

const WorkList = () => {
  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  const [works, setWorks] = useState([]);
  const [clients, setClients] = useState({}); // Armazena os nomes dos clientes por ID
  const navigate = useNavigate();

  useEffect(() => {
    // Busca os trabalhos
    axios.get(`${BASE_URL}/api/works`)
      .then(response => {
        setWorks(response.data);
        // Busca os clientes associados
        const uniqueClientIds = [...new Set(response.data.map(work => work.client_id))];
        fetchClients(uniqueClientIds);
      })
      .catch(error => console.error('Error: ', error));
  }, []);

  // Função para buscar nomes dos clientes
  const fetchClients = async (clientIds) => {
    const clientData = {};
    for (const id of clientIds) {
      if (!clients[id]) { // Busca somente clientes que ainda não estão no estado
        try {
          const response = await axios.get(`${BASE_URL}/api/clients/${id}`);
          clientData[id] = response.data.name;
        } catch (error) {
          console.error(`Error fetching client ${id}:`, error);
        }
      }
    }
    setClients(prevClients => ({ ...prevClients, ...clientData }));
  };

  const handleRowClick = (id) => {
    navigate(`/edit-work/${id}`);
  };

  return (
    <Layout>
      <Body>
        <Div>
          <Table className="table">
            <thead>
              <tr className="title-row">
                <th>ID</th>
                <th>NOME</th>
                <th>CLIENTE</th>
                <th>ANDARES</th>
                <th>AREA</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work, index) => (
                <tr
                  key={work.id}
                  onClick={() => handleRowClick(work.id)}
                  className={index % 2 === 0 ? 'even' : 'odd'}
                >
                  <td>{work.id}</td>
                  <td>{work.name}</td>
                  <td>{clients[work.client_id] || "Carregando..."}</td>
                  <td>{work.floors}</td>
                  <td>{work.area}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Div>
      </Body>
    </Layout>
  );
};

export default WorkList;
