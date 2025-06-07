* {
   
}

body {
    background: #7db7fa;
    font-family: 'Poppins', Arial, sans-serif;
    margin: 0;
    padding: 0;
}

.salas-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 24px;
    padding: 32px 32px 0 32px;
}

.voltar-btn {
    background: none;
    border: none;
    font-size: 2.5rem;
    font-weight: bold;
    color: #111;
    cursor: pointer;
    margin-right: 12px;
}

.titulo-reservar {
    font-size: 2.5rem;
    font-weight: 900;
    color: #111;
    margin-right: 32px;
}

.filtros {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.2rem;
    font-weight: 600;
}

.filtro-btn {
    background: #2a1fff;
    color: #fff;
    border: none;
    border-radius: 18px;
    padding: 8px 24px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-left: 8px;
    cursor: pointer;
    transition: background 0.18s, transform 0.18s;
}

.filtro-btn.ativo {
    background: #1a00b3;
    transform: scale(1.08);
}

.dias-container {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin: 32px 32px 0 32px;
    align-items: stretch;
    height: calc(100vh - 120px); /* aumenta para ocupar mais da tela */
    min-height: 400px;
}

.dia-bloco {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    height: 100%;
}

.dia-titulo {
    font-size: 2.3rem;
    font-weight: 900;
    color: #000;
    margin-bottom: 18px;
    letter-spacing: 1px;
    width: 100%;
    text-align: center;
    background: transparent;
    position: static;
    padding: 0;
}

.dia-coluna {
    background: #1a357a;
    border-radius: 48px 48px 0 0;
    padding: 0 32px 0 32px;
    min-width: 220px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0;
    min-height: 0;
    height: 100%;
    box-sizing: border-box;
    justify-content: flex-start;
    overflow-y: auto;
}

.sala-item,
.sala-vazia {
    font-size: 2.1rem; /* aumentado */
    color: #fff;
    font-weight: bold;
    margin-bottom: 12px;
    letter-spacing: 1px;
    width: 100%;
    text-align: center;
    margin-top: 80px;
}

.sala-vazia {
    color: #bcd;
    font-weight: 400;
}

.dia-coluna .sala-item:last-child,
.dia-coluna .sala-vazia:last-child {
    margin-bottom: 0;
}

.semana-navegacao {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
}

.seta-semana {
    background: #2a1fff;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.18s, transform 0.18s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.seta-semana:hover {
    background: #1a00b3;
    transform: scale(1.12);
}

.label-semana {
    font-size: 1.2rem;
    font-weight: bold;
    color: #222;
    background: #e6eaff;
    border-radius: 12px;
    padding: 6px 18px;
    min-width: 120px;
    text-align: center;
}

@media (max-width: 900px) {
    .dias-container {
        gap: 8px;
        margin: 24px 4px 0 4px;
    }
    .dia-coluna {
        padding: 0 6px 0 6px;
        min-width: 90px;
        border-radius: 28px 28px 0 0;
    }
    .dia-titulo {
        font-size: 1.1rem;
        margin-bottom: 8px;
    }
    .sala-item, .sala-vazia {
        font-size: 1rem;
        margin-top: 40px;
    }
}

// Adicione este código para tornar cada sala clicável e redirecionar para /confirmar
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.sala-item').forEach(function(item) {
        if (!item.classList.contains('sala-vazia')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function() {
                // Pega o dia da semana e o número da sala
                const dia = item.closest('.dia-bloco').querySelector('.dia-titulo').textContent.trim();
                const sala = item.textContent.trim();
                // Se possível, pegue a data real do backend (adicione como data-atributo no HTML)
                // Exemplo: <div class="sala-item" data-data="2024-06-10">T-18</div>
                const data = item.dataset.data || '';
                const params = new URLSearchParams({
                    sala: sala,
                    data: data || dia // prioriza data real, senão envia o nome do dia
                });
                window.location.href = `/confirmar?${params.toString()}`;
            });
        }
    });
});