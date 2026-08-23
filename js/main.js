'use strict';

// Header scroll state — adiciona a classe .scrolled ao rolar a página
const elHeader = document.getElementById('siteHeader');
const themeSections = document.querySelectorAll('[data-section-theme]');

function updateHeader(){
  const scrolled = window.scrollY > 40;
  elHeader.classList.toggle('scrolled', scrolled);
  // Sem rolagem (topo = hero escuro): header transparente com texto claro
  if (!scrolled) return;

  // Scrollspy: qual seção ocupa o topo da viewport decide o tema do header
  const spyY = window.scrollY + elHeader.offsetHeight + 4;
  let current = null;
  themeSections.forEach(sec => {
    if (sec.offsetTop <= spyY) current = sec;
  });
  const onDark = current ? current.dataset.sectionTheme === 'dark' : true;
  elHeader.classList.toggle('on-dark', onDark);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Mobile nav — abre/fecha o menu ao clicar no burger
const elBurger = document.getElementById('burger');
const elNavLinks = document.getElementById('navLinks');
elBurger.addEventListener('click', () => {
  elNavLinks.classList.toggle('open');
});

// Mobile nav — fecha o menu ao clicar em qualquer link
elNavLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => elNavLinks.classList.remove('open'));
});

// Mobile nav — fecha o drawer ao redimensionar para desktop (evita "preso aberto")
const mqDesktop = window.matchMedia('(min-width: 769px)');
const closeDrawerOnDesktop = (e) => { if (e.matches) elNavLinks.classList.remove('open'); };
if (mqDesktop.addEventListener) mqDesktop.addEventListener('change', closeDrawerOnDesktop);
else mqDesktop.addListener(closeDrawerOnDesktop);

// Scroll reveal — revela elementos com a classe .reveal ao entrarem na viewport
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

// Botão de contato no header mobile (.header-cta): posicionamento é 100%
// CSS (absolute dentro do header fixo) — ver css/responsive.css.

