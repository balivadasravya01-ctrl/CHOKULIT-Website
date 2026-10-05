// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const mobile = document.querySelector('.mobile-nav');

menuBtn.addEventListener('click', () => {
  const open = mobile.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => mobile.classList.remove('open'));
});

// Copy UPI number
document.getElementById('copyUpi').addEventListener('click', async () => {
  const n = document.getElementById('upiNumber').textContent.trim();
  try {
    await navigator.clipboard.writeText(n);
    document.getElementById('copyStatus').textContent = 'Number copied.';
  } catch (e) {
    document.getElementById('copyStatus').textContent = 'Please copy the number above.';
  }
});
