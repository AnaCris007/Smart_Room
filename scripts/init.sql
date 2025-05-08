-- init.sql

-- Criar extensão para suportar UUIDs, se ainda não estiver ativada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela Alunos
CREATE TABLE Alunos (
matricula INT PRIMARY KEY NOT NULL,
nome VARCHAR(100) NOT NULL,
turma VARCHAR(10) NOT NULL,
ano INT NOT NULL,
senha_aluno VARCHAR(60) NOT NULL,
numero_reports INT DEFAULT 0
);

-- Criar tabela Salas_disponiveis
CREATE TABLE Salas_disponiveis(
id_salas_dispo SERIAL PRIMARY KEY,
numero_sala INT NOT NULL,
dia_disponivel DATE NOT NULL,
a_partir_das TIME NOT NULL,
ate_as TIME NOT NULL,
CHECK (ate_as > a_partir_das)
);


-- Criar tabela Duracao
CREATE TABLE Duracao(
id_duracao SERIAL PRIMARY KEY,
descricao_duracao VARCHAR(100) NOT NULL
);

-- Adicionar os tipos de duração de reserva existentes na escola ou universidade
INSERT INTO Duracao (descricao_duracao) Values
('30 minutos'),
('1 hora'),
('1 hora e 30 minutos'),
('2 horas');

-- Criar tabela Reservas
CREATE TABLE Reservas (
id_reservas SERIAL PRIMARY KEY,
matricula_alunos INT NOT NULL,
id_salas_dispo INT NOT NULL,
id_duracao INT NOT NULL,
horario TIME NOT NULL,
dia DATE NOT NULL,
FOREIGN KEY (matricula_alunos) REFERENCES Alunos(matricula),
FOREIGN KEY (id_salas_dispo) REFERENCES Salas_Disponiveis(id_salas_dispo),
FOREIGN KEY (id_duracao) REFERENCES Duracao(id_duracao)
);

-- Criar tabela Reports
CREATE TABLE Reports (
id_report SERIAL PRIMARY KEY,
id_reservas INT NOT NULL,
descricao VARCHAR(300) NOT NULL,
data_report DATE NOT NULL,
FOREIGN KEY (id_reservas) REFERENCES Reservas(id_reservas)
);

-- Criar tabela Cancelamentos
CREATE TABLE Cancelamentos (
id_cancelar SERIAL PRIMARY KEY,
id_reservas INT NOT NULL,
dia_cancelar DATE NOT NULL,
FOREIGN KEY (id_reservas) REFERENCES Reservas(id_reservas)
);

-- Criar tabela Professores
CREATE TABLE Professores (
id_professor SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
nome_user VARCHAR(100) NOT NULL UNIQUE,
senha_professor VARCHAR(60) NOT NULL
);

-- Criar tabela Suspensoes
CREATE TABLE Suspensoes (
id_suspensao SERIAL PRIMARY KEY,
id_professor INT NOT NULL,
matricula_alunos INT NOT NULL,
dia_suspensao DATE NOT NULL,
FOREIGN KEY (id_professor) REFERENCES Professores(id_professor),
FOREIGN KEY (matricula_alunos) REFERENCES Alunos(matricula)
);
