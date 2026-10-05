(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navegacao');
  const mobile = window.matchMedia('(max-width: 699px)');
  if (menu && nav) {
    document.documentElement.classList.add('has-js');
    menu.hidden = !mobile.matches;
    const setOpen = (open, returnFocus = false) => {
      menu.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      menu.querySelector('.menu-label').textContent = open ? 'Fechar' : 'Menu';
      if (returnFocus) menu.focus();
    };
    menu.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor || !mobile.matches) return;
      setOpen(false);
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    mobile.addEventListener('change', () => { menu.hidden = !mobile.matches; setOpen(false); });
  }
})();

(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.gallery');
    const slides = [...track.querySelectorAll('figure')];
    const previous = carousel.querySelector('[data-carousel-previous]');
    const next = carousel.querySelector('[data-carousel-next]');
    const status = carousel.querySelector('[data-carousel-status]');
    const controls = carousel.querySelector('.carousel-controls');
    if (slides.length && previous && next && status && controls) {
      track.classList.add('is-carousel');
      track.tabIndex = 0;
      track.setAttribute('role', 'group');
      track.setAttribute('aria-label', 'Fotos do Realizarte');
      track.setAttribute('aria-describedby', 'carrossel-instrucoes');
      carousel.setAttribute('aria-roledescription', 'carrossel');
      controls.hidden = false;
      carousel.querySelector('.carousel-hint').hidden = false;
      let index = 0;
      let frame = 0;
      const offsets = () => slides.map(slide => slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft);
      const update = () => {
        const starts = offsets();
        const max = track.scrollWidth - track.clientWidth;
        index = starts.reduce((best, value, current) => Math.abs(value - track.scrollLeft) < Math.abs(starts[best] - track.scrollLeft) ? current : best, 0);
        const visibleCount = slides.filter(slide => {
          const rect = slide.getBoundingClientRect();
          const viewport = track.getBoundingClientRect();
          return rect.left >= viewport.left - 3 && rect.right <= viewport.right + 3;
        }).length || 1;
        const end = Math.min(slides.length, index + visibleCount);
        status.textContent = visibleCount > 1 ? (index + 1) + '–' + end + ' de ' + slides.length : (index + 1) + ' de ' + slides.length;
        previous.disabled = track.scrollLeft <= 3;
        next.disabled = track.scrollLeft >= max - 3;
      };
      const go = direction => {
        const starts = offsets();
        const max = track.scrollWidth - track.clientWidth;
        const target = direction > 0 ? starts.find(value => value > track.scrollLeft + 5) : starts.findLast(value => value < track.scrollLeft - 5);
        track.scrollTo({left: Math.min(max, Math.max(0, target ?? (direction > 0 ? max : 0))), behavior: reduced.matches ? 'instant' : 'smooth'});
      };
      previous.addEventListener('click', () => go(-1));
      next.addEventListener('click', () => go(1));
      track.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault(); go(event.key === 'ArrowRight' ? 1 : -1);
        } else if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault(); track.scrollTo({left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: reduced.matches ? 'instant' : 'smooth'});
        }
      });
      track.addEventListener('scroll', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); }, {passive:true});
      if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
      else window.addEventListener('resize', update);
      update();
    }
  }

  // Animar somente ao entrar em tela. Sem o script, o conteúdo permanece visível.
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const groups = ['.hero-copy', '.about-copy', '.area-list', '.experience-copy', '.section-heading', '.gallery', '.contact-copy', '.contact-details'];
    const elements = new Set();
    for (const selector of groups) {
      document.querySelectorAll(selector).forEach(group => {
        [...group.children].forEach((element, index) => {
          element.style.setProperty('--cascade-delay', Math.min(index, 5) * 90 + 'ms');
          elements.add(element);
        });
      });
    }
    document.querySelectorAll('.hero-figure, .about-image, .experience-figure').forEach(element => elements.add(element));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('cascade-visible');
        observer.unobserve(entry.target);
      }
    }, {threshold:.08});
    elements.forEach(element => observer.observe(element));
  }
})();
