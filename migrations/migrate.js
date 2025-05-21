// migrate.js
const fs = require('fs');
const path = require('path');
const db = require('../config/database'); // ajuste o caminho se necessário

const initSqlPath = path.join(__dirname, '../scripts/init.sql'); // Caminho para o arquivo init.sql

const runMigration = async () => {
  try {
    const sql = fs.readFileSync(initSqlPath, 'utf-8'); // Lê o conteúdo do init.sql
    await db.query(sql); // Executa o SQL no banco de dados
    console.log('Migração concluída com sucesso.');
    process.exit(); // Encerra o processo após a execução
  } catch (error) {
    console.error('Erro ao rodar migração:', error);
    process.exit(1);
  }
};

runMigration();
