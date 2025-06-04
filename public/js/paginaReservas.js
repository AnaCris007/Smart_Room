document.addEventListener('DOMContentLoaded', () => {
    const reservasListDiv = document.getElementById('reservasList');
    const novaReservaBtn = document.querySelector('.nova-reserva-btn');

    // Mock data - replace with actual data from your database or passed via EJS
    const mockReservas = [
        {
            id: 1,
            sala: 'A-02',
            data: '15/05',
            horario: 'das 15h às 16h'
        },
        {
            id: 2,
            sala: 'H-08',
            data: '17/05',
            horario: 'das 8h às 10h'
        },
        {
            id: 3,
            sala: 'C-12',
            data: '18/05',
            horario: 'das 10h às 11h'
        },
        {
            id: 4,
            sala: 'LabInf-01',
            data: '19/05',
            horario: 'das 14h às 17h'
        }
        // Add more reservations as needed
    ];

    function renderReservas(reservas) {
        if (!reservasListDiv) {
            console.error('Element with ID "reservasList" not found.');
            return;
        }
        reservasListDiv.innerHTML = ''; // Clear existing static or old items

        if (reservas.length === 0) {
            reservasListDiv.innerHTML = '<p class="empty-message">Nenhuma reserva encontrada.</p>';
            return;
        }

        reservas.forEach(reserva => {
            const reservaItem = document.createElement('div');
            reservaItem.classList.add('reserva-item');
            reservaItem.setAttribute('data-id', reserva.id);

            reservaItem.innerHTML = `
                <div class="details">
                    <p><i class="material-icons">meeting_room</i> Sala: ${reserva.sala}</p>
                    <p><i class="material-icons">calendar_today</i> Data: ${reserva.data}</p>
                    <p><i class="material-icons">schedule</i> Horário: ${reserva.horario}</p>
                </div>
                <button class="action-button cancelar-btn">CANCELAR</button>
            `;
            reservasListDiv.appendChild(reservaItem);
        });

        // Add event listeners to new cancel buttons
        addCancelEventListeners();
    }

    function addCancelEventListeners() {
        const cancelarBtns = document.querySelectorAll('.cancelar-btn');
        cancelarBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const reservaItem = event.target.closest('.reserva-item');
                const reservaId = reservaItem.getAttribute('data-id');
                console.log(`Cancelar reserva ID: ${reservaId}`);
                // Here you would add logic to actually cancel the reservation
                // (e.g., make an API call to your backend)
                // For now, we'll just remove it from the view as an example
                reservaItem.remove(); 
                
                // You might want to re-fetch or update your mockReservas array and re-render
                // or call a function to check if the list is empty and display a message
                checkIfReservasListEmpty();
            });
        });
    }

    function checkIfReservasListEmpty() {
        if (reservasListDiv && reservasListDiv.children.length === 0) {
            reservasListDiv.innerHTML = '<p class="empty-message">Nenhuma reserva encontrada.</p>';
        }
    }

    if (novaReservaBtn) {
        novaReservaBtn.addEventListener('click', () => {
            console.log('Botão NOVA RESERVA clicado');
            // Logic for new reservation (e.g., open a modal or navigate to another page)
            alert('Funcionalidade NOVA RESERVA a ser implementada!');
        });
    }

    // Initial render of reservations
    // In a full MVC app, this data might be embedded in the EJS by the server,
    // or fetched via an API call.
    renderReservas(mockReservas);

    // Example: Event listeners for top bar buttons (optional)
    const backButton = document.querySelector('.back-button');
    const refreshButton = document.querySelector('.refresh-button');
    const hamburgerButton = document.querySelector('.hamburger-menu');

    if(backButton) {
        backButton.addEventListener('click', () => {
            console.log('Back button clicked');
            // window.history.back(); // Uncomment to enable browser back functionality
            alert('Botão Voltar clicado!');
        });
    }

    if(refreshButton) {
        refreshButton.addEventListener('click', () => {
            console.log('Refresh button clicked');
            // window.location.reload(); // Uncomment to enable page reload
            alert('Botão Recarregar clicado!');
        });
    }

    if(hamburgerButton) {
        hamburgerButton.addEventListener('click', () => {
            console.log('Hamburger menu clicked');
            alert('Menu Hamburger clicado! Implementar navegação.');
        });
    }

}); 