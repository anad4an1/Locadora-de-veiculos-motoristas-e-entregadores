/* CANVAS DE PARTÍCULAS INTERATIVAS */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
    this.density = (Math.random() * 20) + 1;
  }

  draw() {
    ctx.fillStyle = 'rgba(180, 180, 180, 0.4)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (mouse.radius - distance) / mouse.radius;
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;

      this.x -= directionX;
      this.y -= directionY;
    }
  }
}

function init() {
  particles = [];
  const numberOfParticles = (canvas.width * canvas.height) / 10000;
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle());
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();
  }
  connect();
  requestAnimationFrame(animate);
}
animate();

function connect() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 110) {
        let opacity = 1 - (distance / 110);
        ctx.strokeStyle = `rgba(150, 150, 150, ${opacity * 0.12})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

/* EFEITO 3D TILT NOS CARDS */
const cards = document.querySelectorAll('.card-tilt');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});
/* =========================================================
   MODO CLARO / ESCURO
   ========================================================= */

const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {

    themeToggle.addEventListener('click', () => {

        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Recupera o tema salvo
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
    } else {
        themeToggle.textContent = '☀️';
    }
}

/* =========================================================
   FORMULÁRIO DE CONTATO -> TELA DE CONFIRMAÇÃO + WHATSAPP
   ========================================================= */

// Número de WhatsApp da equipe (formato internacional, só dígitos)
const WHATSAPP_NUMBER = '5561984674175';

const contatoForm = document.getElementById('contato-form');
const successModal = document.getElementById('success-modal');
const whatsappLink = document.getElementById('whatsapp-link');
const modalClose = document.getElementById('modal-close');

if (contatoForm && successModal && whatsappLink) {

  contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('f-nome').value.trim();
    const telefone = document.getElementById('f-telefone').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const categoria = document.getElementById('f-categoria').value;
    const mensagem = document.getElementById('f-mensagem').value.trim();

    const texto =
`Olá! Gostaria de solicitar uma análise de cadastro na CarLoc.

Nome: ${nome}
Telefone: ${telefone}
E-mail: ${email}
Categoria desejada: ${categoria}` +
      (mensagem ? `\nObservações: ${mensagem}` : '');

    whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

    // Mostra a tela de confirmação
    successModal.classList.add('active');
    document.body.classList.add('no-scroll');

    contatoForm.reset();
  });

  function closeSuccessModal() {
    successModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  modalClose.addEventListener('click', closeSuccessModal);

  // Fecha ao clicar fora da caixa do modal
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) closeSuccessModal();
  });

  // Fecha com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
      closeSuccessModal();
    }
  });
}

/* =========================================================
   FILTRO DE CATEGORIA - PÁGINA "FROTA COMPLETA"
   ========================================================= */

const filterButtons = document.querySelectorAll('.filter-btn');
const filterCards = document.querySelectorAll('[data-cat]');

if (filterButtons.length && filterCards.length) {

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filtro = btn.dataset.filter;

      filterCards.forEach((card) => {
        const mostra = filtro === 'all' || card.dataset.cat === filtro;
        card.style.display = mostra ? '' : 'none';
      });
    });
  });
}