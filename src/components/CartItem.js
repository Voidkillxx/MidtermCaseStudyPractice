import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../Styles/CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item-card beautiful-cart-item">
      <img
        src={item.imageUrl || '/img/placeholder.png'}
        alt={item.name}
        className="cart-item-img"
        style={{ borderRadius: 12, background: "#f6fcf9", minWidth: "80px", minHeight: "80px" }}
      />
      <div className="cart-item-details">
        <div className="cart-item-title-row">
          <h2 className="cart-item-title" style={{ color: "#326133", margin: 0 }}>{item.name}</h2>
          <button
            className="cart-delete-btn"
            onClick={() => removeFromCart(item.id)}
            title="Remove from cart"
            style={{
              background: "#ff6550",
              border: "none",
              borderRadius: "12px",
              padding: "7px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
          >
            {/* Modern outlined trash icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="6" width="20" height="16" rx="6" fill="#ff6550" />
              <path d="M8 10v6M12 10v6M16 10v6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <rect x="7" y="4" width="10" height="4" rx="2" fill="#ff6550" stroke="#fff" strokeWidth="2"/>
              <rect x="8" y="2" width="8" height="3" rx="1.5" fill="#fff"/>
            </svg>
          </button>
        </div>
        <div className="cart-item-category" style={{ color: "#75877c", fontSize: "1.1rem" }}>{item.category}</div>
        <div className="cart-item-controls" style={{ margin: "12px 0" }}>
          <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span className="cart-item-qty">{item.quantity}</span>
          <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
        <div className="cart-item-price" style={{ fontWeight: 600, fontSize: 20, color: "#2c532f" }}>
          ₱{item.price * item.quantity}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
