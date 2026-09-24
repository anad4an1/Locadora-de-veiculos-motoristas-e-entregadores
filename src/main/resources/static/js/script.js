document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. CONTROLE DO MENU DRAWER MOBILE & BACKDROP
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const menuBackdrop = document.getElementById('menu-backdrop');
  const drawerInteractiveElements = document.querySelectorAll('.drawer-link, .btn-drawer-login, .btn-drawer-primary, .btn-drawer-whatsapp');
  const sessionKey = 'carloc-session';
  const authLinks = document.querySelectorAll('#nav-auth-link, #drawer-auth-link');

  const updateAuthLinks = () => {
    const session = JSON.parse(localStorage.getItem(sessionKey) || 'null');

    authLinks.forEach((link) => {
      const label = link.querySelector('.auth-link-label');
      if (!label) return;

      if (session) {
        link.href = '#';
        link.classList.add('is-logged-in');
        label.textContent = session.email;
        link.querySelector('.auth-logout-label')?.classList.add('visible');
        link.title = 'Sair da conta';
      } else {
        link.href = 'auth.html';
        link.classList.remove('is-logged-in');
        label.textContent = 'CADASTRAR / LOGIN';
        link.querySelector('.auth-logout-label')?.classList.remove('visible');
        link.removeAttribute('title');
      }
    });
  };

  updateAuthLinks();

  authLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!localStorage.getItem(sessionKey)) return;
      event.preventDefault();
      localStorage.removeItem(sessionKey);
      updateAuthLinks();
    });
  });

  const openMenu = () => {
    mobileDrawer?.classList.add('active');
    menuBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileDrawer?.classList.remove('active');
    menuBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', openMenu);
  drawerClose?.addEventListener('click', closeMenu);
  menuBackdrop?.addEventListener('click', closeMenu);

  drawerInteractiveElements.forEach((element) => {
    element.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('active')) {
      closeMenu();
    }
  });

  // ==========================================
  // 2. ANIMAÇÃO DE ROTAÇÃO DA LOGO
  // ==========================================
  const logoWrapper = document.querySelector('.logo-icon-wrapper');

  if (logoWrapper) {
    logoWrapper.addEventListener('click', () => {
      const svg = logoWrapper.querySelector('.logo-svg');
      if (svg) {
        svg.style.animation = 'none';
        void svg.offsetWidth; // Force Reflow
        svg.style.animation = 'spinTwice 2s cubic-bezier(0.25, 1, 0.5, 1) forwards';
      }
    });
  }

  // ==========================================
  // 3. SCROLL REVEAL (ANIMAÇÃO AO ROLAR)
  // ==========================================
  const reveals = document.querySelectorAll('.reveal-up');
  const fleetCards = document.querySelectorAll('.vehicle-card');
  const fleetTabs = document.querySelectorAll('.fleet-tabs .tab-btn');
  const searchButton = document.querySelector('.btn-widget-search');
  const categorySelect = document.querySelector('.widget-field select');
  const reserveButtons = document.querySelectorAll('.btn-card-action, .section-action');
  const bookingForm = document.querySelector('#booking-form');
  const bookingMessage = document.querySelector('#booking-message');

  const requireLogin = () => {
    if (localStorage.getItem(sessionKey)) {
      return true;
    }

    window.location.href = 'auth.html';
    return false;
  };

  const filterFleet = (filter) => {
    const fleetGrid = document.querySelector('.fleet-grid');
    fleetGrid?.classList.toggle('is-filtered', filter !== 'all');
    fleetCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
    fleetTabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.filter === filter);
    });
  };

  fleetTabs.forEach((tab) => {
    tab.dataset.filter = tab.textContent.includes('ELÉTRICOS')
      ? 'electric'
      : tab.textContent.includes('COMFORT') ? 'comfort' : 'all';
    tab.addEventListener('click', () => filterFleet(tab.dataset.filter));
  });

  searchButton?.addEventListener('click', () => {
    const category = categorySelect?.value || '';
    const filter = category.includes('Elétricos')
      ? 'electric'
      : category.includes('Sedan')
        ? 'comfort'
        : category.includes('Motos')
          ? 'motorcycle'
          : 'all';
    filterFleet(filter);
    document.querySelector('#frota')?.scrollIntoView({ behavior: 'smooth' });
  });

  reserveButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (!requireLogin()) {
        event.preventDefault();
        return;
      }

      if (!button.classList.contains('section-action')) event.preventDefault();
      document.querySelector('#solicitar')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  bookingForm?.addEventListener('submit', (event) => {
    if (!requireLogin()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    bookingMessage.textContent = 'Solicitação recebida. Nossa equipe entrará em contato em breve.';
    bookingMessage.classList.add('success');
    bookingForm.reset();
  });
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add('active');
      }
    });
  };

  const heroVideo = document.querySelector('.hero-video');
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const handleHeroParallax = () => {
    if (!heroVideo || window.innerWidth <= 768 || reduceMotionQuery.matches) {
      heroVideo && (heroVideo.style.transform = 'none');
      return;
    }

    const offset = Math.min(window.scrollY * 0.12, 60);
    heroVideo.style.transform = `scale(1.12) translateY(${offset}px)`;
  };

  window.addEventListener('scroll', () => {
    revealOnScroll();
    handleHeroParallax();
  }, { passive: true });

  window.addEventListener('resize', handleHeroParallax);
  revealOnScroll();
  handleHeroParallax();
});