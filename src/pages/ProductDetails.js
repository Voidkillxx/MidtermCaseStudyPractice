import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const ProductDetails = ({ products }) => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = (products || []).find(p => p.id === parseInt(productId));

  // Style Objects
  const containerStyle = {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  };
  const imageStyle = {
    maxHeight: '400px',
    width: 'auto',
    objectFit: 'contain',
    borderRadius: '10px',
    backgroundColor: 'white',
    padding: '20px',
    border: '1px solid #eee'
  };
  const infoStyle = { paddingLeft: '2rem' };
  const titleStyle = { fontSize: '2.5rem', fontWeight: 'bold' };
  const priceStyle = { fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '1.5rem' };
  const descriptionStyle = { fontSize: '1.1rem', lineHeight: '1.6', color: '#555', marginBottom: '2rem' };
  const buttonStyle = { backgroundColor: '#66BB6A', borderColor: '#66BB6A', padding: '0.75rem 2rem' };
  const backLinkStyle = { color: '#4CAF50', textDecoration: 'none', fontWeight: '500' };

  if (!product) {
    return (
      <Container className="text-center my-5">
        <h2>Product not found!</h2>
        <Link to="/products" style={backLinkStyle}>← Back to All Products</Link>
      </Container>
    );
  }

  return (
    <Container style={containerStyle} className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <Image src={product.imageUrl || '/img/placeholder.png'} alt={product.name} style={imageStyle} fluid />
        </Col>
        <Col md={6} style={infoStyle}>
          <h1 style={titleStyle}>{product.name}</h1>
          <p style={priceStyle}>₱{product.price.toFixed(2)}</p>
          <p style={descriptionStyle}>{product.description}</p>
          <Button variant="success" size="lg" style={buttonStyle} onClick={() => addToCart(product)}>
            <i className="bi bi-cart-plus me-2"></i>
            Add to Cart
          </Button>
          <div className="mt-4">
            <Link to="/products" style={backLinkStyle}>← Back to All Products</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;