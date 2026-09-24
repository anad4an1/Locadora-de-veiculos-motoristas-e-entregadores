const registerForm = document.querySelector('#register-form');
const loginForm = document.querySelector('#login-form');
const tabs = document.querySelectorAll('.auth-tab');
const message = document.querySelector('#auth-message');
const storageKey = 'carloc-user';
const sessionKey = 'carloc-session';

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

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(registerForm);
  const user = {
    email: data.get('email').trim().toLowerCase(),
    phone: data.get('phone').trim(),
    password: data.get('password'),
  };

  localStorage.setItem(storageKey, JSON.stringify(user));
  registerForm.reset();
  showMessage('Cadastro criado. Agora voce ja pode entrar.', 'success');
  setTimeout(() => switchMode('login'), 700);
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem(storageKey) || 'null');
  const email = loginForm.email.value.trim().toLowerCase();
  const password = loginForm.password.value;

  if (!user) {
    showMessage('Nenhum cadastro encontrado. Crie sua conta primeiro.', 'error');
    return;
  }

  if (email !== user.email || password !== user.password) {
    showMessage('Email ou senha incorretos.', 'error');
    return;
  }

  showMessage(`Login realizado. Bem-vindo, ${user.email}!`, 'success');
  localStorage.setItem(sessionKey, JSON.stringify({ email: user.email, phone: user.phone }));
  loginForm.reset();
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
});
