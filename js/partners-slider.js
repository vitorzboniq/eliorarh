// Partners Infinite Slider - Vanilla JS Corrigido
// Loop infinito suave com reset preciso

document.addEventListener('DOMContentLoaded', initPartnersSlider);

function initPartnersSlider() {
  const track = document.getElementById('partnerTrack');
  const prevBtn = document.getElementById('partnerPrev');
  const nextBtn = document.getElementById('partnerNext');
  const carousel = document.querySelector('.partner-carousel');
  
  if (!track || !prevBtn || !nextBtn || !carousel) return;

  const originalSlides = Array.from(track.querySelectorAll('.partner-slide'));
  if (originalSlides.length < 2) return;

  // Configurações
  const SCROLL_INTERVAL = 3000;
  const TRANSITION_DURATION = 600;
  
  // Calcular step (largura do slide + gap)
  const firstSlide = originalSlides[0];
  const slideWidth = firstSlide.offsetWidth;
  const gap = 12;
  const step = slideWidth + gap;
  
  // Largura total dos slides ORIGINAIS (ponto de reset)
  const originalWidth = originalSlides.length * step;

  // Clonar slides e adicionar ao final
  originalSlides.forEach(slide => {
    const clone = slide.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  let position = 0;
  let isAnimating = false;
  let autoScrollTimer = null;
  let isHovering = false;
  let direction = 1; // 1 = esquerda (next), -1 = direita (prev)

  function moveTrack(delta, animate = true) {
    if (isAnimating) return;
    
    const newPosition = position + delta;
    
    if (animate) {
      isAnimating = true;
      track.style.transition = `transform ${TRANSITION_DURATION}ms ease-out`;
    } else {
      track.style.transition = 'none';
    }
    
    track.style.transform = `translateX(${newPosition}px)`;
    position = newPosition;
    
    if (animate) {
      setTimeout(() => {
        isAnimating = false;
        checkAndReset();
      }, TRANSITION_DURATION);
    } else {
      checkAndReset();
    }
  }

  // Lógica do loop infinito: reset quando passar da largura original
  function checkAndReset() {
    // Se foi muito para a esquerda (passou todos os originais)
    if (position <= -originalWidth) {
      // Pular instantaneamente para posição equivalente no início
      position += originalWidth;
      track.style.transition = 'none';
      track.style.transform = `translateX(${position}px)`;
    }
    // Se foi muito para a direita (antes do início)
    else if (position > 0) {
      position -= originalWidth;
      track.style.transition = 'none';
      track.style.transform = `translateX(${position}px)`;
    }
  }

  function startAutoScroll() {
    stopAutoScroll();
    if (isHovering) return;
    
    autoScrollTimer = setInterval(() => {
      if (!isHovering && !isAnimating) {
        moveTrack(-step * direction);
      }
    }, SCROLL_INTERVAL);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollTimer);
  }

  // Botões
  prevBtn.addEventListener('click', () => {
    stopAutoScroll();
    direction = -1;
    moveTrack(step);
    direction = 1;
  });

  nextBtn.addEventListener('click', () => {
    stopAutoScroll();
    direction = 1;
    moveTrack(-step);
    direction = 1;
  });

  // Hover pause
  carousel.addEventListener('mouseenter', () => {
    isHovering = true;
    stopAutoScroll();
  });

  carousel.addEventListener('mouseleave', () => {
    isHovering = false;
    startAutoScroll();
  });

  // Iniciar
  startAutoScroll();

  // Recalcular em resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => location.reload(), 150);
  });
}