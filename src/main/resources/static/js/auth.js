const registerForm = document.querySelector('#register-form');
const loginForm = document.querySelector('#login-form');
const tabs = document.querySelectorAll('.auth-tab');
const message = document.querySelector('#auth-message');
const sessionKey = 'carloc-session';

// Endereço do servidor vem do js/config.js (config.js precisa ser carregado ANTES deste arquivo)
const API = typeof API_URL === 'string' ? API_URL : '';

const showMessage = (text, type) => {
  message.textContent = text;
  message.className = `auth-message ${type}`;
};

const switchMode = (mode) => {
  const registering = mode === 'register';
  registerForm.hidden = !registering;
  loginForm.hidden = registering;
  tabs.forEach((tab) => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active);
  });
  message.textContent = '';
  message.className = 'auth-message';
};

tabs.forEach((tab) => tab.addEventListener('click', () => switchMode(tab.dataset.mode)));

// Envia JSON para o servidor e devolve { ok, status, corpo }
const enviar = async (caminho, dados) => {
  const resposta = await fetch(API + caminho, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  const texto = await resposta.text();
  let corpo = texto;
  try {
    corpo = JSON.parse(texto);
  } catch (e) {
    // resposta em texto simples (mensagens de erro do servidor)
  }

  return { ok: resposta.ok, status: resposta.status, corpo };
};

const MSG_ESPERA = 'Enviando... se o servidor estava parado, pode levar até 1 minuto.';
const MSG_FALHA = 'Não foi possível conectar ao servidor. Tente novamente em instantes.';

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(registerForm);
  const botao = registerForm.querySelector('button[type="submit"]');

  const dados = {
    email: data.get('email').trim().toLowerCase(),
    telefone: data.get('phone').trim(),
    senha: data.get('password'),
  };

  if (botao) botao.disabled = true;
  showMessage(MSG_ESPERA, 'success');

  try {
    const r = await enviar('/usuarios/cadastro', dados);

    if (!r.ok) {
      showMessage(typeof r.corpo === 'string' ? r.corpo : 'Não foi possível criar o cadastro.', 'error');
      return;
    }

    registerForm.reset();
    showMessage('Cadastro criado. Agora voce ja pode entrar.', 'success');
    setTimeout(() => switchMode('login'), 700);
  } catch (erro) {
    showMessage(MSG_FALHA, 'error');
  } finally {
    if (botao) botao.disabled = false;
  }
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const botao = loginForm.querySelector('button[type="submit"]');

  const dados = {
    email: loginForm.email.value.trim().toLowerCase(),
    senha: loginForm.password.value,
  };

  if (botao) botao.disabled = true;
  showMessage(MSG_ESPERA, 'success');

  try {
    const r = await enviar('/usuarios/login', dados);

    if (!r.ok) {
      showMessage(typeof r.corpo === 'string' ? r.corpo : 'Email ou senha incorretos.', 'error');
      return;
    }

    const usuario = r.corpo;
    showMessage(`Login realizado. Bem-vindo, ${usuario.email}!`, 'success');
    localStorage.setItem(
      sessionKey,
      JSON.stringify({ id: usuario.id, email: usuario.email, phone: usuario.telefone })
    );
    loginForm.reset();
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  } catch (erro) {
    showMessage(MSG_FALHA, 'error');
  } finally {
    if (botao) botao.disabled = false;
  }
});