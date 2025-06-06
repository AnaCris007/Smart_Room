document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form');
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const matricula = form.matricula.value.trim();
    const senha_aluno = form.senha_aluno.value;

    // Validação frontend
    if (!/^\d+$/.test(matricula)) {
      alert('A matrícula deve conter apenas números.');
      return;
    }
    if (!senha_aluno || senha_aluno.length < 4) {
      alert('A senha deve ter pelo menos 4 caracteres.');
      return;
    }

    try {
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricula, senha_aluno })
      });

      if (resp.ok) {
        // Login bem-sucedido
        const data = await resp.json();
        if (data.aluno && data.aluno.matricula) {
          localStorage.setItem('matricula', data.aluno.matricula);
        }
        window.location.href = '/reservas';
      } else {
        const erro = await resp.json();
        alert(erro.erro || 'Matrícula ou senha inválidos.');
      }
    } catch (err) {
      alert('Erro ao conectar ao servidor.');
    }
  });
});