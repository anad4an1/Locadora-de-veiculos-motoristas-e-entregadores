const tabs = document.querySelectorAll('.tab-item');
const cards = document.querySelectorAll('.catalog-card');
const sessionKey = 'carloc-session';

const requireLogin = () => {
  if (localStorage.getItem(sessionKey)) {
    return true;
  }

  window.location.href = 'auth.html';
  return false;
};

const detailsModal = document.createElement('div');
detailsModal.className = 'details-modal';
detailsModal.hidden = true;
detailsModal.innerHTML = `
  <div class="details-modal-backdrop" data-close-modal></div>
  <section class="details-modal-content" role="dialog" aria-modal="true" aria-labelledby="details-title">
    <button class="details-modal-close" type="button" aria-label="Fechar detalhes" data-close-modal>&times;</button>
    <p class="vehicle-brand" id="details-brand"></p>
    <h2 id="details-title"></h2>
    <p id="details-type"></p>
    <a class="btn-action primary" href="index.html#solicitar">RESERVAR ESTE MODELO</a>
  </section>
`;
document.body.append(detailsModal);

const closeModal = () => {
  detailsModal.hidden = true;
  document.body.style.overflow = '';
};

const openModal = (card) => {
  detailsModal.querySelector('#details-brand').textContent = card.querySelector('.vehicle-brand').textContent;
  detailsModal.querySelector('#details-title').textContent = card.querySelector('.model-title').textContent;
  detailsModal.querySelector('#details-type').textContent = card.querySelector('.vehicle-type').textContent;
  detailsModal.hidden = false;
  document.body.style.overflow = 'hidden';
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => item.classList.toggle('active', item === tab));
    cards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.brand !== filter;
    });
  });
});

cards.forEach((card) => {
  card.querySelectorAll('.btn-action').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('primary')) {
        if (!requireLogin()) return;
        window.location.href = 'index.html#solicitar';
        return;
      }

      openModal(card);
    });
  });
});

detailsModal.addEventListener('click', (event) => {
  if (event.target.closest('[data-close-modal]')) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !detailsModal.hidden) {
    closeModal();
  }
});
