import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AddProduct = () => {
  const boxStyle = {
    backgroundColor: "#f8f9fa",
    padding: "2.5rem",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  };

  const titleStyle = {
    color: "#4CAF50",
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textAlign: "left",
  };

  const formStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#333",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    border: "none",
    padding: "0.6rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "600",
  };

  const cancelButtonStyle = {
    backgroundColor: "#c8e6c9",
    border: "none",
    padding: "0.6rem 1.5rem",
    borderRadius: "8px",
    color: "#2e7d32",
    fontWeight: "600",
    marginLeft: "10px",
  };

  return (
    <Container className="my-5">
      <div style={boxStyle}>
        <h3 style={titleStyle}>Add Products</h3>
        <div style={formStyle}>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formProductName">
                  <Form.Label style={labelStyle}>Product Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter product name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formStock">
                  <Form.Label style={labelStyle}>Stock</Form.Label>
                  <Form.Control type="number" placeholder="Enter stock quantity" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formDescription">
                  <Form.Label style={labelStyle}>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter product description"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPrice">
                  <Form.Label style={labelStyle}>Price (₱)</Form.Label>
                  <Form.Control type="number" placeholder="Enter price" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formCategory">
                  <Form.Label style={labelStyle}>Category</Form.Label>
                  <Form.Control type="text" placeholder="Enter category" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDiscount">
                  <Form.Label style={labelStyle}>Discount (%)</Form.Label>
                  <Form.Control type="number" placeholder="Enter discount (optional)" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="formImageUrl">
                  <Form.Label style={labelStyle}>Image URL</Form.Label>
                  <Form.Control type="text" placeholder="Enter image URL" />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center">
              <Button style={buttonStyle} type="button">
                Create Product
              </Button>
              <Button style={cancelButtonStyle} type="button">
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default AddProduct;
