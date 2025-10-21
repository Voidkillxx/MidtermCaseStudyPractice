import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/Cart.css';

const SHIPPING_COST = 36;

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('online');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const subtotal = getCartTotal();
  const total = subtotal + SHIPPING_COST;

 const handlePlaceOrder = (e) => {
  e.preventDefault();
  const orderData = {
    products: cart,
    shipping,
    payment: paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment",
    accountNumber: paymentMethod === "online" ? accountNumber : "",
    accountName: paymentMethod === "online" ? accountName : "",
    total,
    subtotal,
    date: new Date().toLocaleDateString(),
    orderId: Math.floor(Math.random() * 1_000_000_000_000), // Simple order number
    status: "Pending",
    estimated: "in 3-5 days"
  };
  clearCart();
  navigate('/order-status', { state: { order: orderData } });
};


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #d7fbe8 0%, #c1eac7 100%)",
        paddingTop: 36,
        paddingBottom: 36,
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 56,
          maxWidth: 1240,
          margin: "auto"
        }}
      >
        <form
          className="checkout-form"
          onSubmit={handlePlaceOrder}
          style={{
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 6px 30px rgba(80,180,120,.13)",
            padding: "38px 36px 32px 36px",
            maxWidth: 490,
            minWidth: 355,
            flexGrow: 1,
            position: "relative"
          }}
        >
          <button
            type="button"
            onClick={() => navigate('/cart')}
            style={{
              position: 'absolute',
              left: 30,
              top: 18,
              background: "#e9f8ef",
              border: "none",
              borderRadius: 8,
              color: "#326133",
              fontWeight: 600,
              padding: "7px 22px 7px 12px",
              cursor: "pointer",
              fontSize: 16,
              boxShadow: "0 2px 8px #d7fbe8"
            }}
          >← Back to Cart</button>
          <div style={{ marginTop: 44 }}>
            <h3 style={{ color: "#65CB7A", fontWeight: 800, fontSize: 22, marginBottom: 18, letterSpacing: .5 }}>Shipping Information</h3>
            <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
              <input
                type="text"
                placeholder="Full Name"
                value={shipping.fullName}
                onChange={e => setShipping({ ...shipping, fullName: e.target.value })}
                required
                style={{ flex: 1, marginRight: 4, padding: '11px 12px', border: "1.6px solid #b3e9c5", borderRadius: 8, fontSize: 16, transition: 'border 0.2s' }}
              />
              <input
                type="email"
                placeholder="Email"
                value={shipping.email}
                onChange={e => setShipping({ ...shipping, email: e.target.value })}
                required
                style={{ flex: 1, marginLeft: 4, padding: '11px 12px', border: "1.6px solid #b3e9c5", borderRadius: 8, fontSize: 16, transition: 'border 0.2s' }}
              />
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
              <input
                type="tel"
                placeholder="Phone Number"
                value={shipping.phone}
                onChange={e => setShipping({ ...shipping, phone: e.target.value })}
                required
                style={{ flex: 1, marginRight: 4, padding: '11px 12px', border: "1.6px solid #b3e9c5", borderRadius: 8, fontSize: 16 }}
              />
              <input
                type="text"
                placeholder="City"
                value={shipping.city}
                onChange={e => setShipping({ ...shipping, city: e.target.value })}
                required
                style={{ flex: 1, marginLeft: 4, padding: '11px 12px', border: "1.6px solid #b3e9c5", borderRadius: 8, fontSize: 16 }}
              />
            </div>
            <textarea
              rows={2}
              placeholder="Address"
              value={shipping.address}
              onChange={e => setShipping({ ...shipping, address: e.target.value })}
              required
              style={{
                width: "100%", minHeight: 46,
                marginBottom: 13,
                padding: '11px 12px',
                border: "1.6px solid #b3e9c5", borderRadius: 8, fontSize: 16, resize: "none"
              }}
            />
          </div>
          <div style={{ margin: "22px 0 0 0" }}>
            <h3 style={{ color: "#65CB7A", fontWeight: 800, fontSize: 22, marginBottom: 15 }}>Payment Method</h3>
            <div style={{
              background: "#eafbf5", borderRadius: 14, padding: "15px 19px", marginBottom: 17, boxShadow: "0 1px 5px #e3eecf33"
            }}>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  style={{ marginRight: 12, accentColor: "#65CB7A", width: 20, height: 20 }}
                />
                <span style={{ fontWeight: 800, fontSize: 17, color: "#223e25", marginRight: 7 }}>Cash on Delivery (COD)</span>
                <span style={{ color: "#65CB7A", fontWeight: 500, fontSize: 15 }}>
                  Pay when you receive your order
                </span>
              </label>
            </div>
            <div style={{
              background: "#eafbf5", borderRadius: 14, padding: "15px 19px",
              marginBottom: paymentMethod === "online" ? 12 : 3,
              boxShadow: "0 1px 5px #e3eecf33"
            }}>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  style={{ marginRight: 12, accentColor: "#65CB7A", width: 20, height: 20 }}
                />
                <span style={{ fontWeight: 800, fontSize: 17, color: "#223e25", marginRight: 7 }}>Online Payment</span>
                <span style={{ color: "#2EBC4A", fontWeight: 500, fontSize: 15 }}>
                  Pay securely online with credit, debit card or E-wallets
                </span>
              </label>
            </div>
            {paymentMethod === "online" && (
              <div style={{ marginTop: 14 }}>
                <input
                  type="text"
                  placeholder="Account Number"
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                  style={{ width: "100%", marginBottom: 9, padding: '11px 12px', border: "1.6px solid #b3e9c5", borderRadius: 8, fontSize: 16 }}
                />
                <input
                  type="text"
                  placeholder="Account Name"
                  value={accountName}
                  onChange={e => setAccountName(e.target.value)}
                  style={{ width: "100%", padding: '11px 12px', border: "1.6px solid #b3e9c5", borderRadius: 8, fontSize: 16 }}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: 26, marginBottom: 2,
              background: "linear-gradient(90deg, #65cb7a 15%, #2ebc4a 100%)",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: 19,
              borderRadius: 10,
              padding: "15px 0",
              letterSpacing: ".5px",
              boxShadow: "0 3px 18px #65cb7a40",
              transition: "background .18s"
            }}
          >
            Place Order
          </button>
        </form>
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 6px 30px rgba(80,180,120,.12)",
            padding: 32,
            width: 350,
            alignSelf: "flex-start",
          }}
        >
          <div style={{ marginBottom: 21 }}>
            <h3 style={{ color: "#65CB7A", fontWeight: 800, fontSize: 22, marginBottom: 16 }}>Order Summary</h3>
            {cart.length === 0 ? (
              <div style={{ color: "#41a45e", marginBottom: 28, fontSize: 17 }}>No products in cart.</div>
            ) : (
              cart.map(item => (
                <div key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                    fontSize: 17,
                  }}
                >
                  <span style={{ fontWeight: 500, letterSpacing: ".1px" }}>{item.name} x {item.quantity}</span>
                  <span style={{ color: "#1ea859", fontWeight: 700 }}>₱{item.price * item.quantity}</span>
                </div>
              ))
            )}
            <hr style={{ margin: "16px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, marginBottom: 7 }}>
              <span>Subtotal</span>
              <span>₱{subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17 }}>
              <span>Shipping</span>
              <span>₱{SHIPPING_COST.toFixed(2)}</span>
            </div>
            <hr style={{ margin: "14px 0" }} />
            <div style={{
              display: "flex", justifyContent: "space-between", fontWeight: 800,
              fontSize: 22, color: "#2EBC4A", letterSpacing: ".2px"
            }}>
              <span>Total</span>
              <span>₱{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
