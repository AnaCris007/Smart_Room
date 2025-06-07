const pool = require('../config/db');

exports.contarCancelamentosPorMatricula = async (matricula_alunos) => {
    const result = await pool.query(
        `SELECT COUNT(*) FROM cancelamentos c
         JOIN reservas r ON c.id_reservas = r.id_reservas
         WHERE r.matricula_alunos = $1`,
        [matricula_alunos]
    );
    return parseInt(result.rows[0].count, 10);
};

exports.cancelarReserva = async (id_reservas) => {
    await pool.query(
        `INSERT INTO cancelamentos (id_reservas, dia_cancelar) VALUES ($1, CURRENT_DATE)`,
        [id_reservas]
    );
};
