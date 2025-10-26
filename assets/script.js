
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
        history.pushState(null, '', '#'+id);
      }
    });
  });
  // Copy email
  const copyBtn = document.getElementById('copy-email');
  if(copyBtn){
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.dataset.email;
      try{ await navigator.clipboard.writeText(email);
        copyBtn.innerText = 'Copied ✓';
        setTimeout(()=> copyBtn.innerText = 'Copy', 1200);
      }catch(e){ alert('Copy failed, email: ' + email); }
    });
  }
});
