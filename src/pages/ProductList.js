import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';
import { CartContext } from '../context/CartContext'; // Import CartContext
import '../Styles/ProductList.css';

const ProductList = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  currentPage,
  productsPerPage,
  setCurrentPage
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // Use CartContext

  useEffect(() => {
    const categoryIdFromUrl = searchParams.get('category');
    if (categoryIdFromUrl) {
      onSelectCategory(parseInt(categoryIdFromUrl));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage, selectedCategory]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = (products || []).slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Add to cart uses CartContext's function
  const handleAddToCartAndRedirect = (product) => {
    addToCart(product); // use context!
    navigate('/cart');
  };

  return (
    <Container className="my-5">
      <div className="product-list-container">
        <h3 className="product-list-title">All Products</h3>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
        <Row className="g-4 mt-3">
          {currentProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} onAddToCart={handleAddToCartAndRedirect} />
            </Col>
          ))}
        </Row>
        <Pagination 
          itemsPerPage={productsPerPage} 
          totalItems={(products || []).length} 
          currentPage={currentPage} 
          paginate={paginate} 
        />
      </div>
    </Container>
  );
};

export default ProductList;
