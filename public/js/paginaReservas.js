document.addEventListener("DOMContentLoaded", async function () {
  const caixa = document.getElementById("caixa-reservas");
  const semReservas = document.getElementById("sem-reservas");
  const novaReservaBtn = document.getElementById("botaoNovaReserva");
  const tituloReservas = document.getElementById("tituloReservas");
  const nenhumaReservaMsg = document.getElementById("nenhumaReservaMsg");

  // Busca matrícula do aluno logado
  const matricula = localStorage.getItem('matricula');
  if (!matricula) {
    window.location.href = '/login';
    return;
  }

  // Busca reservas do aluno logado
  let reservas = [];
  try {
    const resp = await fetch(`/alunos/${matricula}/reservas`);
    if (resp.ok) {
      reservas = await resp.json();
    }
  } catch (err) {
    reservas = [];
  }

  // Limpa o container antes de renderizar
  caixa.innerHTML = "";

  if (!reservas || reservas.length === 0) {
    caixa.style.display = "none";
    semReservas.style.display = "flex";
    novaReservaBtn.style.display = "none";
    if (tituloReservas) tituloReservas.style.display = "none";
    if (nenhumaReservaMsg) nenhumaReservaMsg.style.display = "flex";
  } else {
    semReservas.style.display = "none";
    caixa.style.display = "block";
    novaReservaBtn.style.display = "inline-flex";
    if (tituloReservas) tituloReservas.style.display = "flex";
    if (nenhumaReservaMsg) nenhumaReservaMsg.style.display = "none";

    reservas.forEach((reserva) => {
      const div = document.createElement("div");
      div.classList.add("item-reserva");

      // Formatação de data e horário
      let dataFormatada = reserva.dia || reserva.dia_disponivel || '';
      if (dataFormatada && dataFormatada.includes('T')) {
        dataFormatada = new Date(dataFormatada).toLocaleDateString('pt-BR');
      }
      let horarioFormatado = reserva.horario || '';
      if (horarioFormatado && horarioFormatado.length > 5) {
        horarioFormatado = horarioFormatado.slice(0,5);
      }

      // Mostra corretamente o número da sala e duração
      div.innerHTML = `
        <p><img src="/assets/Icons/porta.png" alt="Sala" />Sala: ${reserva.numero_sala || reserva.sala || ''}</p>
        <p><img src="/assets/Icons/calendario.png" alt="Data" />Data: ${dataFormatada}</p>
        <p><img src="/assets/Icons/relogio.png" alt="Horário" />Horário: ${horarioFormatado}</p>
        <p><img src="/assets/Icons/relogio.png" alt="Duração" />Duração: ${reserva.descricao_duracao || ''}</p>
        <button class="cancelar-btn">CANCELAR</button>
      `;

      caixa.appendChild(div);
    });
  }

  // Ação do botão grande
  const botaoGrande = document.querySelector(".grande-reserva-btn");
  if (botaoGrande) {
    botaoGrande.addEventListener("click", () => {
      window.location.href = "/salas";
    });
  }

  // Ação do botão do topo
  if (novaReservaBtn) {
    novaReservaBtn.addEventListener("click", () => {
      window.location.href = "/salas";
    });
  }

  // Função para mostrar o pop-up de confirmação
  function showPopupCancelar(idReserva, onConfirm) {
    const popup = document.getElementById('popup-cancelar');
    popup.style.display = 'flex';

    const btnSim = popup.querySelector('.popup-btn-sim');
    const btnNao = popup.querySelector('.popup-btn-nao');

    btnSim.onclick = null;
    btnNao.onclick = null;

    btnSim.onclick = () => {
      popup.style.display = 'none';
      if (onConfirm) onConfirm();
    };
    btnNao.onclick = () => {
      popup.style.display = 'none';
    };
  }

  // Função para mostrar o pop-up de reserva cancelada
  function showPopupCancelada() {
    const popup = document.getElementById('popup-cancelada');
    popup.style.display = 'flex';
    const btnFechar = document.getElementById('fecharCancelada');
    if (btnFechar) {
      btnFechar.onclick = () => {
        popup.style.display = 'none';
      };
    }
    // Fecha ao clicar fora do box
    popup.onclick = (e) => {
      if (e.target === popup) popup.style.display = 'none';
    };
  }

  // Após renderizar as reservas, adicione o evento ao botão cancelar
  if (reservas && reservas.length > 0) {
    const cancelarBtns = document.querySelectorAll('.cancelar-btn');
    cancelarBtns.forEach((btn, idx) => {
      btn.onclick = (e) => {
        e.preventDefault();
        const reserva = reservas[idx];
        showPopupCancelar(reserva.id_reservas, async () => {
          try {
            const resp = await fetch('/api/cancelamentos', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id_reservas: reserva.id_reservas })
            });
            if (resp.ok) {
              // Remove a reserva da lista sem recarregar a página
              btn.closest('.item-reserva').remove();
              showPopupCancelada();
              // Se não houver mais reservas, atualize a tela
              if (document.querySelectorAll('.item-reserva').length === 0) {
                caixa.style.display = "none";
                semReservas.style.display = "flex";
                novaReservaBtn.style.display = "none";
                if (tituloReservas) tituloReservas.style.display = "none";
                if (nenhumaReservaMsg) nenhumaReservaMsg.style.display = "flex";
              }
            } else {
              alert('Erro ao cancelar reserva.');
            }
          } catch {
            alert('Erro ao cancelar reserva.');
          }
        });
      };
    });
  }

  // Após renderizar as reservas, adicione o evento ao clicar em uma sala
  if (reservas && reservas.length > 0) {
    const reservaItems = document.querySelectorAll('.item-reserva');
    reservaItems.forEach((item, idx) => {
      item.onclick = (e) => {
        // Evita conflito com botão cancelar
        if (e.target.classList.contains('cancelar-btn')) return;
        const reserva = reservas[idx];
        // Redireciona para /confirmar com os dados da reserva na query string
        const params = new URLSearchParams({
          sala: reserva.id_salas_dispo || reserva.sala || '',
          data: reserva.dia || reserva.data || '',
          horario: reserva.horario || reserva.inicio || ''
        });
        window.location.href = `/confirmar?${params.toString()}`;
      };
    });
  }
});
