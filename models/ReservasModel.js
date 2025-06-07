const pool = require('../config/db');

// Cria uma reserva corretamente vinculando o aluno e a sala disponível
exports.criarReserva = async ({ numero_sala, dia, horario, duracao, matricula_alunos }) => {
    // Ajusta o formato da data para YYYY-MM-DD se vier como DD/MM/YYYY
    let diaFormatado = dia;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dia)) {
        const [d, m, y] = dia.split('/');
        diaFormatado = `${y}-${m}-${d}`;
    }
    // Busca o id_salas_dispo correto
    const salaResult = await pool.query(
        `SELECT id_salas_dispo FROM salas_disponiveis WHERE numero_sala = $1 AND dia_disponivel = $2 LIMIT 1`,
        [numero_sala, diaFormatado]
    );
    if (!salaResult.rows.length) throw new Error('Sala não encontrada para o dia informado.');

    const id_salas_dispo = salaResult.rows[0].id_salas_dispo;

    // Busca o id_duracao correto
    let descricao = '';
    if (duracao == 30) descricao = '30 minutos';
    else if (duracao == 60) descricao = '1 hora';
    else if (duracao == 90) descricao = '1 hora e 30 minutos';
    else if (duracao == 120) descricao = '2 horas';
    else throw new Error('Duração inválida.');

    const duracaoResult = await pool.query(
        `SELECT id_duracao FROM duracao WHERE descricao_duracao = $1 LIMIT 1`,
        [descricao]
    );
    if (!duracaoResult.rows.length) throw new Error('Duração não encontrada.');

    const id_duracao = duracaoResult.rows[0].id_duracao;

    // Insere a reserva
    await pool.query(
        `INSERT INTO reservas (matricula_alunos, id_salas_dispo, dia, horario, id_duracao)
         VALUES ($1, $2, $3, $4, $5)`,
        [matricula_alunos, id_salas_dispo, diaFormatado, horario, id_duracao]
    );
};

// Busca reservas de um aluno específico (apenas as que NÃO estão canceladas)
exports.listarReservasPorMatricula = async (matricula_alunos) => {
    const result = await pool.query(
        `SELECT r.*, s.numero_sala, s.dia_disponivel, d.descricao_duracao
         FROM reservas r
         JOIN salas_disponiveis s ON r.id_salas_dispo = s.id_salas_dispo
         JOIN duracao d ON r.id_duracao = d.id_duracao
         WHERE r.matricula_alunos = $1
           AND r.id_reservas NOT IN (SELECT id_reservas FROM cancelamentos)
         ORDER BY r.dia, r.horario`,
        [matricula_alunos]
    );
    return result.rows;
};
