import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderStatus = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state || !state.order) {
    // No order, redirect or show empty
    return (
      <div style={{
        background: "#c9f3d7", minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center"
      }}>
        <div style={{ padding: 40, background: "#fff", borderRadius: 18, boxShadow: "0 3px 16px #8bd79b55" }}>
          No recent order found.
          <button
            style={{
              marginLeft: 28,
              padding: "8px 22px",
              background: "#65cb7a", color: "#fff",
              border: "none", borderRadius: 7,
              fontWeight: 600, cursor: "pointer"
            }}
            onClick={() => navigate('/')}
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }

  const { order } = state;
  return (
    <div style={{
      background: "#c9f3d7", minHeight: "100vh", padding: "33px 0"
    }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10, marginRight: 18 }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#bcecc7", border: "none", borderRadius: 8, fontWeight: 600,
            color: "#346c40", padding: "8px 31px", fontSize: 16, boxShadow: "0 3px 14px #bcecc7a1", cursor: "pointer"
          }}
        >
          Back Home
        </button>
      </div>
      <div style={{
        margin: "auto", maxWidth: 570, background: "#fff", borderRadius: 25,
        boxShadow: "0 2px 14px #8bd79b49", padding: "28px 28px 30px 28px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 600, color: "#7ab578", fontSize: 16, marginBottom: 3 }}>
              Order #{order.orderId}
              <span style={{
                marginLeft: 9, background: "#c8eec8", color: "#2ebc4a", fontSize: 14,
                padding: "3px 13px", borderRadius: 14, fontWeight: 700
              }}>
                {order.status}
              </span>
            </div>
            <div style={{ fontSize: 15, color: "#627a68", marginBottom: 5 }}>
              <span>{order.date}</span>
              {" · "}
              <span style={{ color: "#41a45e", fontWeight: 600, fontSize: 15 }}>
                {order.payment}
              </span>
            </div>
          </div>
          <div style={{
            fontWeight: 800, color: "#2EBC4A", fontSize: 22, alignSelf: "center"
          }}>
            ₱{order.total}
            <span style={{ fontSize: 12, display: "block", color: "#7ab578", fontWeight: 400 }}>Total Amount</span>
          </div>
        </div>
        <hr />
        {order.products.map((prod, idx) => (
          <div key={idx} style={{
            display: "flex", alignItems: "center", marginBottom: 9
          }}>
            <img
              src={prod.imageUrl || "/img/basket.png"}
              alt={prod.name}
              style={{ width: 65, height: 65, objectFit: "cover", borderRadius: 13, marginRight: 15, background: "#eafbf5" }}
            />
            <div>
              <span style={{ fontWeight: 700, color: "#2c4830", fontSize: 16 }}>{prod.name}</span>
              <span style={{ fontWeight: 500, color: "#75887a", fontSize: 15, marginLeft: 7 }}>× {prod.quantity}</span>
            </div>
          </div>
        ))}
        <div style={{
          background: "#c9f3d7", borderRadius: 16, padding: "14px 20px",
          margin: "23px 0 13px 0"
        }}>
          <div style={{ fontWeight: 800, color: "#3a7050", marginBottom: 2, fontSize: 15 }}>
            📍 Shipping address
          </div>
          <div style={{ color: "#2b4a36", fontSize: 15, fontWeight: 500, marginLeft: 23, marginTop: 2 }}>
            <div>{order.shipping.fullName}</div>
            <div>{order.shipping.address}</div>
            <div>{order.shipping.city}</div>
            <div>{order.shipping.phone}</div>
          </div>
        </div>
        <div style={{
          fontWeight: 700, color: "#65cb7a", fontSize: 15, marginTop: 7
        }}>
          Estimated Delivery
        </div>
        <div style={{
          color: "#75887a", fontWeight: 500, fontSize: 14, marginLeft: 18, marginTop: 2
        }}>
          {order.estimated}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
