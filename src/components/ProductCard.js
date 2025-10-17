import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  if (!product) {
    return null;
  }

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
          <Card.Text className="product-card-price">
            ₱{product.price.toFixed(2)}
          </Card.Text>
        </div>
        <Button
          variant="success"
          className="add-to-cart-button mt-auto"
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;