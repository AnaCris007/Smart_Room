const pool = require('../config/db');

exports.buscarAlunoPorMatricula = async (matricula) => {
    const result = await pool.query(
        'SELECT nome FROM alunos WHERE matricula = $1 LIMIT 1',
        [matricula]
    );
    return result.rows[0] || null;
};
