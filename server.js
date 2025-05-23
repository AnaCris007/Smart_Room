// Importa o framework Express para criar o servidor
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Importa as rotas agrupadas 
const routes = require('./routes');

// Cria uma instância do app Express
const app = express();
// Define a porta onde o servidor vai escutar as requisições
const port = 3000;

// Middlewares - funções que processam as requisições antes de chegar nas rotas

app.use(cors());              
app.use(express.json());     // Habilita o Express para entender requisições com corpo JSON

// Configura o uso das rotas importadas em todas as URLs ('/')
app.use('/', routes);

// Inicializa o servidor, fazendo ele escutar na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
