import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 1. Import useSearchParams
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';

const ProductList = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  currentPage,
  productsPerPage,
  setCurrentPage
}) => {
  const [searchParams] = useSearchParams(); // 2. Initialize the hook

  useEffect(() => {
    // 3. When the component loads, check the URL for a category
    const categoryIdFromUrl = searchParams.get('category');
    if (categoryIdFromUrl) {
      onSelectCategory(parseInt(categoryIdFromUrl));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on component load

  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage, selectedCategory]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = (products || []).slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const productListBoxStyle = { backgroundColor: '#f8f9fa', padding: '2.5rem', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' };
  const sectionTitleStyle = { color: '#4CAF50', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2.5rem', textAlign: 'left' };

  return (
    <Container className="my-5">
      <div style={productListBoxStyle}>
        <h3 style={sectionTitleStyle}>All Products</h3>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
        <Row className="g-4 mt-3">
          {currentProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </Col>
          ))}
        </Row>
        <Pagination itemsPerPage={productsPerPage} totalItems={(products || []).length} currentPage={currentPage} paginate={paginate} />
      </div>
    </Container>
  );
};

export default ProductList;