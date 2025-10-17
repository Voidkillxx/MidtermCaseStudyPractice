import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const cardStyle = { border: 'none', borderRadius: '10px', overflow: 'hidden', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', height: '100%' };
  const linkStyle = { textDecoration: 'none', color: 'inherit' };
  const imgStyle = { width: '100%', height: '150px', objectFit: 'contain', padding: '10px', backgroundColor: 'white', borderBottom: '1px solid #eee' };
  const bodyStyle = { padding: '15px', backgroundColor: 'white' };
  const titleStyle = { fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '5px' };
  const viewLinkStyle = { color: '#4CAF50', fontWeight: 'bold', fontSize: '0.95rem' };

  return (
    <Card style={cardStyle}>
      {/* UPDATE THIS LINK */}
      <Link to={`/products?category=${category.id}`} style={linkStyle}>
        <Card.Img
          variant="top"
          src={category.imageUrl}
          alt={category.name}
          style={imgStyle}
        />
        <Card.Body style={bodyStyle}>
          <Card.Title style={titleStyle}>{category.name}</Card.Title>
          <div style={viewLinkStyle}>
            Browse →
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default CategoryCard;