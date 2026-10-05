// ---------- CART STATE ----------
const GST_RATE = 0.05;
const DELIVERY_FEE = 50;
const UPI_ID = '8340883349@upi';         // <-- change to your actual UPI ID
const UPI_NAME = 'Chokulit';
const WHATSAPP_NUMBER = '918340883349';  // <-- your WhatsApp number
const UPI_DISPLAY = '83408 83349';

let cart = JSON.parse(localStorage.getItem('chokulitCart') || '[]');

// ---------- SAVE & RENDER ----------
function saveCart() {
  localStorage.setItem('chokulitCart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount, #cartCountMobile, #cartCountHero').forEach(el => {
    if (el) el.textContent = count;
  });
}

// ---------- ADD TO CART ----------
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price, 10);
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    saveCart();
    btn.textContent = 'Added ✓';
    setTimeout(() => { btn.textContent = 'Add to cart'; }, 1200);
  });
});

// ---------- CART PAGE ----------
if (document.getElementById('cartItems')) {
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const empty = document.getElementById('emptyCart');
  const content = document.getElementById('cartContent');

  if (cart.length === 0) {
    empty.style.display = 'block';
    content.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  content.style.display = 'block';
  container.innerHTML = '';

  cart.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <span class="item-price">₹${item.price}</span>
      </div>
      <div class="qty-controls">
        <button class="qty-down" data-index="${index}">−</button>
        <span>${item.qty}</span>
        <button class="qty-up" data-index="${index}">+</button>
      </div>
      <span class="item-price">₹${item.price * item.qty}</span>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    container.appendChild(row);
  });

  updateTotals();

  container.querySelectorAll('.qty-up').forEach(b => b.addEventListener('click', () => {
    cart[b.dataset.index].qty += 1;
    saveCart(); renderCart();
  }));
  container.querySelectorAll('.qty-down').forEach(b => b.addEventListener('click', () => {
    const i = b.dataset.index;
    cart[i].qty -= 1;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    saveCart(); renderCart();
  }));
  container.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', () => {
    cart.splice(b.dataset.index, 1);
    saveCart(); renderCart();
  }));
}

function updateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst + DELIVERY_FEE;
  document.getElementById('subtotal').textContent = '₹' + subtotal;
  document.getElementById('gst').textContent = '₹' + gst;
  document.getElementById('delivery').textContent = '₹' + DELIVERY_FEE;
  document.getElementById('total').textContent = '₹' + total;
}

// ---------- CHECKOUT + UPI ----------
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const notes = document.getElementById('custNotes').value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const gst = Math.round(subtotal * GST_RATE);
    const total = subtotal + gst + DELIVERY_FEE;
    const orderId = 'CHK' + Date.now().toString().slice(-6);

    // Build order summary for WhatsApp
    const items = cart.map(i => `${i.name} x${i.qty} = ₹${i.price * i.qty}`).join('\n');
    const waMessage = encodeURIComponent(
      `*Chokulit Order ${orderId}*\n\n${items}\n\nSubtotal: ₹${subtotal}\nGST: ₹${gst}\nDelivery: ₹${DELIVERY_FEE}\n*Total: ₹${total}*\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nNotes: ${notes || 'None'}`
    );

    // Open UPI app (PhonePe/GPay/Paytm)
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${total}&cu=INR&tn=${encodeURIComponent('Chokulit Order ' + orderId)}`;
    window.location.href = upiUrl;

    // Show order confirmation
    document.getElementById('cartContent').style.display = 'none';
    document.getElementById('orderPlaced').style.display = 'block';
    document.getElementById('orderNumber').textContent = orderId;
    document.getElementById('whatsappLink').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

    // Clear cart
    cart = [];
    saveCart();
  });
}

// ---------- COPY UPI NUMBER ----------
const copyBtn = document.getElementById('copyUpi');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(UPI_DISPLAY);
      document.getElementById('copyStatus').textContent = 'Number copied.';
    } catch (e) {
      document.getElementById('copyStatus').textContent = 'Please copy the number above.';
    }
  });
}

// ---------- MOBILE MENU ----------
const menuBtn = document.querySelector('.menu-btn');
const mobile = document.querySelector('.mobile-nav');
if (menuBtn && mobile) {
  menuBtn.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.mobile-nav a').forEach(a =>
    a.addEventListener('click', () => mobile.classList.remove('open'))
  );
}

// Init
updateCartCount();

