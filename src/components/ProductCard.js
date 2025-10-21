import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styles/ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate(); // Create navigate instance

  if (!product) {
    return null;
  }

  // Calculate selling price based on discount
  const calculateSellingPrice = (price, discount) => {
    const disc = discount || 0;
    return price * (1 - disc / 100);
  };

  const hasDiscount = product.discount && product.discount > 0;
  const sellingPrice = calculateSellingPrice(product.price, product.discount);

  // Handler that adds to cart and navigates
  const handleAddToCart = () => {
    onAddToCart(product);
    navigate('/cart');
  };

  return (
    <Card className="product-card shadow-sm h-100">
      <Link to={`/product/${product.id}`}>
        <Card.Img
          variant="top"
          src={product.imageUrl || '/img/placeholder.png'}
          alt={product.name}
          className="product-card-image"
        />
      </Link>
      <Card.Body className="d-flex flex-column text-center">
        <div className="flex-grow-1">
          <Card.Title className="product-card-title">
            <Link to={`/product/${product.id}`} className="product-card-link">
              {product.name}
            </Link>
          </Card.Title>
          {/* Price Display */}
          <div className="product-card-price-section">
            {hasDiscount ? (
              <>
                <div className="product-card-price">
                  ₱{sellingPrice.toFixed(2)}
                </div>
                <div className="product-card-original-price">
                  ₱{product.price.toFixed(2)}
                </div>
                <div className="product-card-discount-badge">
                  {product.discount}% OFF
                </div>
              </>
            ) : (
              <div className="product-card-price">
                ₱{product.price.toFixed(2)}
              </div>
            )}
          </div>
        </div>
        <Button
          variant="success"
          className="add-to-cart-button mt-auto"
          onClick={handleAddToCart} // Use handler here
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
