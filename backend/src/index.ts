import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/database';
import './models';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', routes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API MV Financeiro funcionando!' });
});

// Inicializa o servidor
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    console.log(`Servidor rodando na porta ${port}`);
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}); 