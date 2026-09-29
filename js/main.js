/* UHX MEDIA — Interaction Layer */

(() => {
  const cursor = document.getElementById('cursor');
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (cursor && finePointer && !reduced) {
    window.addEventListener('pointermove', (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    }, { passive: true });

    document.querySelectorAll('a,button,.service,.work,.step').forEach((element) => {
      element.addEventListener('pointerenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1.45)'; });
      element.addEventListener('pointerleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
    });
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('on');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const form = document.querySelector('.request-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      const honeypot = form.querySelector('[name="website"]');
      if (honeypot && honeypot.value.trim()) event.preventDefault();
    });
  }
})();
