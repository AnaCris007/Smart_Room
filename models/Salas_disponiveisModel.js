const pool = require('../config/db'); // Importa a conexão com o banco de dados

const SalasDisponiveisModel = {
  // Função para criar uma nova sala disponível com os dados fornecidos
  async criarSalaDisponivel({ numero_sala, dia_disponivel, a_partir_das, ate_as }) {
    // Garante que o campo numero_sala seja string (para aceitar letras e números)
    const query = `
      INSERT INTO Salas_disponiveis (numero_sala, dia_disponivel, a_partir_das, ate_as)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [String(numero_sala), dia_disponivel, a_partir_das, ate_as];
    return pool.query(query, values);
  },

  // Função para listar todas as salas disponíveis, ordenando por dia e número da sala
  async listarSalasDisponiveis() {
    return await pool.query('SELECT * FROM Salas_disponiveis ORDER BY dia_disponivel, numero_sala');
  },

  async salasAgrupadasPorDia() {
    const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const resultado = await this.listarSalasDisponiveis();
    const salasPorDia = {};
    dias.forEach(dia => salasPorDia[dia] = []);
    resultado.rows.forEach(sala => {
      // Converte a data do banco para objeto Date
      const data = new Date(sala.dia_disponivel);
      // 0=Domingo, 1=Segunda, ..., 6=Sábado
      const idx = data.getDay();
      // Mapear para o nome correto em português
      const nomesDias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const diaSemana = nomesDias[idx];
      if (salasPorDia[diaSemana]) {
        salasPorDia[diaSemana].push({
          ...sala,
          nome: sala.numero_sala
        });
      }
    });
    return salasPorDia;
  },

  // Função para atualizar os dados de uma sala disponível específica pelo seu id_salas_dispo
  async atualizarSalaDisponivel(id_salas_dispo, { numero_sala, dia_disponivel, a_partir_das, ate_as }) {
    const query = `
      UPDATE Salas_disponiveis
      SET numero_sala = $1, dia_disponivel = $2, a_partir_das = $3, ate_as = $4
      WHERE id_salas_dispo = $5
      RETURNING *;  // Retorna a sala atualizada
    `;
    const values = [numero_sala, dia_disponivel, a_partir_das, ate_as, id_salas_dispo];
    return pool.query(query, values);
  },

  // Função para excluir uma sala disponível pelo id_salas_dispo e retornar os dados excluídos
  async excluirSalaDisponivel(id_salas_dispo) {
    const query = `
      DELETE FROM Salas_disponiveis
      WHERE id_salas_dispo = $1
      RETURNING *;  // Retorna a sala excluída
    `;
    return pool.query(query, [id_salas_dispo]);
  },

  async salasAgrupadasPorDiaSemanaAtual() {
    const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const resultado = await this.listarSalasDisponiveis();
    const salasPorDia = {};
    dias.forEach(dia => salasPorDia[dia] = []);

    // Descobre o início e fim da semana atual (segunda a domingo)
    const hoje = new Date();
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - ((hoje.getDay() + 6) % 7)); // segunda-feira
    inicioSemana.setHours(0,0,0,0);
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6);
    fimSemana.setHours(23,59,59,999);

    resultado.rows.forEach(sala => {
        const data = new Date(sala.dia_disponivel);
        if (data >= inicioSemana && data <= fimSemana) {
            const idx = data.getDay();
            const nomesDias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
            const diaSemana = nomesDias[idx];
            if (salasPorDia[diaSemana]) {
                salasPorDia[diaSemana].push({
                    ...sala,
                    nome: sala.numero_sala
                });
            }
        }
    });
    return salasPorDia;
  },

  async salasAgrupadasPorSemana() {
    const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const resultado = await this.listarSalasDisponiveis();
    const salasPorSemana = {};

    resultado.rows.forEach(sala => {
        const data = new Date(sala.dia_disponivel);
        // Calcula o offset da semana em relação à semana atual
        const hoje = new Date();
        const inicioSemanaAtual = new Date(hoje);
        inicioSemanaAtual.setDate(hoje.getDate() - ((hoje.getDay() + 6) % 7));
        inicioSemanaAtual.setHours(0,0,0,0);
        const diffDias = Math.floor((data - inicioSemanaAtual) / (1000 * 60 * 60 * 24));
        const offset = Math.floor(diffDias / 7);

        // Descobre o nome do dia da semana
        const nomesDias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const diaSemana = nomesDias[data.getDay()];
        if (!dias.includes(diaSemana)) return;

        if (!salasPorSemana[offset]) salasPorSemana[offset] = {};
        if (!salasPorSemana[offset][diaSemana]) salasPorSemana[offset][diaSemana] = [];
        salasPorSemana[offset][diaSemana].push({
            ...sala,
            nome: sala.numero_sala
        });
    });

    // Garante que todos os dias existam em cada semana
    Object.values(salasPorSemana).forEach(salasPorDia => {
        dias.forEach(dia => {
            if (!salasPorDia[dia]) salasPorDia[dia] = [];
        });
    });

    return salasPorSemana;
  },

  async buscarHorarioDisponibilidade(numero_sala, dia_disponivel) {
    const result = await pool.query(
      `SELECT a_partir_das, ate_as FROM Salas_disponiveis WHERE numero_sala = $1 AND dia_disponivel = $2 LIMIT 1`,
      [numero_sala, dia_disponivel]
    );
    return result.rows[0];
  },

  async atualizarHorarioDisponivel(numero_sala, dia_disponivel, novo_inicio) {
    await pool.query(
      `UPDATE Salas_disponiveis SET a_partir_das = $1 WHERE numero_sala = $2 AND dia_disponivel = $3`,
      [novo_inicio, numero_sala, dia_disponivel]
    );
  },
};

module.exports = SalasDisponiveisModel;
