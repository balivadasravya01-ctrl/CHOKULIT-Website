/* Cart */
.menu-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.menu-card{background:var(--surface);border:1px solid var(--line);padding:24px;display:flex;flex-direction:column}
.menu-card h3{margin:0}
.menu-card p{color:var(--muted);flex:1}
.menu-row{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:16px}
.menu-row .price{font-size:1.1rem}
.add-btn{padding:10px 16px;font-size:.85rem}

.cart-link{font-weight:700;color:var(--accent-text)}

.cart-items{display:flex;flex-direction:column;gap:14px;margin-top:28px}
.cart-item{display:flex;justify-content:space-between;align-items:center;gap:16px;background:var(--surface);border:1px solid var(--line);padding:16px 20px;flex-wrap:wrap}
.cart-item h4{margin:0;font-size:1.05rem}
.qty-controls{display:flex;align-items:center;gap:10px}
.qty-controls button{width:30px;height:30px;border:1px solid var(--line);background:var(--bg);cursor:pointer;font-size:1rem;border-radius:4px}
.qty-controls button:hover{background:var(--accent-soft)}
.item-price{font-weight:700;color:var(--accent-text)}
.remove-btn{background:none;border:none;color:var(--accent-text);text-decoration:underline;cursor:pointer;font-size:.85rem}

.cart-summary{background:var(--surface);border:1px solid var(--line);padding:24px;margin-top:32px;max-width:420px}
.summary-row{display:flex;justify-content:space-between;padding:6px 0;color:var(--muted)}
.summary-row.total{border-top:2px solid var(--ink);margin-top:8px;padding-top:12px;color:var(--ink);font-weight:700;font-size:1.15rem}

.checkout-form{display:flex;flex-direction:column;gap:14px;max-width:520px;margin-top:10px}
.checkout-form label{display:flex;flex-direction:column;gap:6px;font-weight:600;font-size:.9rem}
.checkout-form input,.checkout-form textarea{padding:12px 14px;border:1px solid var(--line);background:var(--surface);font:inherit;border-radius:4px}
.checkout-form input:focus,.checkout-form textarea:focus{outline:2px solid var(--accent);border-color:transparent}

.empty-cart{text-align:center;padding:60px 0}
.empty-cart p{color:var(--muted);margin-bottom:20px}

.order-success{text-align:center;padding:40px 0}
.order-success .btn{margin:8px}

@media(max-width:600px){.menu-grid{grid-template-columns:1fr}}

