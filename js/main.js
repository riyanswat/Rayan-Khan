document.addEventListener('DOMContentLoaded', () => {
  // SPA Navigation
  const navLinks = document.querySelectorAll('nav.nav a[data-link]');
  const sections = ['home', 'shipments', 'testimonials', 'about', 'contact'];

  function setActiveLink(hash) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === hash);
    });
  }

  function showSection(id) {
    if (!id) id = 'home'; // Default to home
    sections.forEach(sec => {
      const sectionElement = document.getElementById(sec);
      if (sectionElement) {
        sectionElement.hidden = (sec !== id);
      }
    });
    setActiveLink(`#${id}`);
    const activeSection = document.getElementById(id);
    if (activeSection) {
      activeSection.focus();
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('href').substring(1);
      history.pushState({ section: target }, '', `#${target}`);
      showSection(target);
    });
  });

  window.addEventListener('popstate', e => {
    const hash = location.hash.substring(1);
    showSection(hash || 'home');
  });

  // Initial load
  const initialHash = location.hash.substring(1);
  showSection(initialHash || 'home');

  // Handle inquiry CTA click
  const inquiryCTA = document.getElementById('inquiry-cta');
  if (inquiryCTA) {
      inquiryCTA.addEventListener('click', () => {
          history.pushState({ section: 'contact' }, '', '#contact');
          showSection('contact');
          document.getElementById('name').focus();
      });
  }

  // Handle form submission
  const quoteForm = document.getElementById('quote');
  if (quoteForm) {
      quoteForm.addEventListener('submit', e => {
          e.preventDefault();
          alert('Thank you for your inquiry! We will get back to you soon.');
          quoteForm.reset();
      });
  }
});
