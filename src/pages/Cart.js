import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import '../Styles/Cart.css';

const SHIPPING_COST = 36;

const Cart = () => {
  const { cart, getCartTotal } = useContext(CartContext);
  const subtotal = getCartTotal();
  const total = subtotal + SHIPPING_COST;
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <svg height="100" width="100" fill="none" viewBox="0 0 64 64">
          <rect x="10" y="15" width="44" height="35" rx="6" stroke="#41a45e" strokeWidth="3" fill="none"/>
          <path d="M20 23v-4a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v4" stroke="#41a45e" strokeWidth="3" fill="none" />
          <path d="M24 36c1.5 2.5 5.5 6 8 6s6.5-3.5 8-6" stroke="#41a45e" strokeWidth="3" fill="none"/>
        </svg>
        <div className="cart-empty-title">Your cart is empty</div>
        <div className="cart-empty-desc">Add some products to get started</div>
        <button
          className="browse-products-btn"
          onClick={() => navigate('/products')}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="cart-bg">
      <div className="cart-main">
        <div className="cart-left">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="cart-right">
          <div className="order-summary-box">
            <h4>Order Summary</h4>
            <div className="order-summary-row">
              <span>Subtotal</span>
              <span>₱{subtotal}</span>
            </div>
            <div className="order-summary-row">
              <span>Shipping</span>
              <span>₱{SHIPPING_COST}</span>
            </div>
            <hr />
            <div className="order-summary-row total-row">
              <span>Total</span>
              <span>₱{total}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
              disabled={cart.length === 0}
            >
              Proceed to checkout
            </button>
            <button className="continue-btn" onClick={() => navigate('/products')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
