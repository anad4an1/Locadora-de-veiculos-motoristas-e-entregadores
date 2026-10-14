const adminForm = document.querySelector('#admin-login-form');
const adminMessage = document.querySelector('#admin-message');
const adminSubmit = document.querySelector('#admin-submit');
const apiBase = window.location.port === '5500'
  ? 'http://localhost:8080'
  : window.location.origin;

const showMessage = (text, type) => {
  adminMessage.textContent = text;
  adminMessage.className = `auth-message ${type}`;
};

adminForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  adminSubmit.disabled = true;
  showMessage('Verificando credenciais...', '');

  try {
    const response = await fetch(`${apiBase}/usuarios/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: adminForm.email.value.trim(),
        senha: adminForm.senha.value,
      }),
    });

    const body = await response.text();
    let result;
    try {
      result = JSON.parse(body);
    } catch {
      result = body;
    }
    if (!response.ok) {
      const message = typeof result === 'string'
        ? result
        : 'Não foi possível validar o acesso administrativo.';
      showMessage(message, 'error');
      return;
    }

    showMessage('Acesso administrativo autorizado.', 'success');
    adminForm.reset();
  } catch {
    showMessage('Não foi possível conectar ao servidor. Tente novamente.', 'error');
  } finally {
    adminSubmit.disabled = false;
  }
});
