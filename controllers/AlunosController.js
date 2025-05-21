// Importa a conexão com o banco de dados configurada em /config/database.js
const db = require('../config/database');
const bcrypt = require('bcrypt'); // biblioteca confiável para gerar hash de senhas.
const saltRounds = 10; //  é um número que define quantas vezes o algoritmo de hash será aplicado para gerar a senha criptografada.

// Função para cadastrar um novo aluno no banco de dados
const cadastrarAluno = async (req, res) => {
  // Extrai os dados do corpo da requisição
  const { matricula, nome, turma, ano, senha_aluno } = req.body;

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!matricula || !nome || !turma || !ano || !senha_aluno) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Gera o hash da senha com bcrypt
    const senhaHash = await bcrypt.hash(senha_aluno, saltRounds);

    // Define a query SQL de inserção com placeholders ($1, $2, etc.)
    const query = `
      INSERT INTO Alunos (matricula, nome, turma, ano, senha_aluno)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;  -- Retorna o aluno inserido
    `;

    // Define os valores a serem inseridos no lugar dos placeholders
    const values = [matricula, nome, turma, ano, senhaHash];

    // Executa a query no banco com os valores fornecidos
    const { rows } = await db.query(query, values);

    // Retorna o aluno inserido com status 201 (Created)
    return res.status(201).json({ aluno: rows[0] });

  } catch (error) {
    // Exibe o erro no console para debug
    console.error('Erro ao cadastrar aluno:', error);

    // Erro específico: matrícula duplicada (violação de chave primária)
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Aluno com essa matrícula já existe.' });
    }

    // Retorna erro genérico caso outro problema ocorra
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// Função para listar todos os alunos cadastrados
const listarAlunos = async (req, res) => {
  try {
    // Executa a query de seleção, ordenando por nome
    const { rows } = await db.query('SELECT * FROM Alunos ORDER BY nome ASC');

    // Retorna a lista de alunos com status 200 (OK)
    return res.status(200).json(rows);

  } catch (error) {
    // Exibe erro no console
    console.error('Erro ao buscar alunos:', error);

    // Retorna erro genérico de servidor
    return res.status(500).json({ error: 'Erro ao buscar alunos.' });
  }
};

// Exporta as funções para serem usadas em rotas ou outros arquivos
module.exports = {
  cadastrarAluno,
  listarAlunos,
};
