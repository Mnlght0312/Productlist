import React, { useState } from "react";
import { Container, Row, Col, Form, Input, Button, Table } from "reactstrap";
import { useEffect } from "react";
import "./App.css";

const products = [
  {
    category: "vegetables",
    name: "Lettuce",
    inStock: true,
    price: 2.99,
    selected: false,
  },
  {
    category: "vegetables",
    name: "Carrots",
    inStock: true,
    price: 1.99,
    selected: false,
  },
  {
    category: "breads",
    name: "Premium burger buns",
    inStock: true,
    price: 4.99,
    selected: false,
  },
  {
    category: "meat",
    name: "Mince",
    inStock: true,
    price: 12.99,
    selected: false,
  },
  {
    category: "spreads",
    name: "Mayonnaise",
    inStock: true,
    price: 3.99,
    selected: false,
  },
  {
    category: "spreads",
    name: "Premium Sauce",
    inStock: false,
    price: 13.99,
    selected: false,
  },
];

function ProductList() {
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    let filtered = [...products];
    if (onlyInStock) {
      filtered = filtered.filter((product) => product.inStock);
    }
    if (searchText) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [onlyInStock, searchText]);

  useEffect(() => {
    let cost = 0;
    selectedProducts.forEach((product) => {
      cost += product.price;
    });
    setTotalCost(cost);
  }, [selectedProducts]);

  const handleCheckboxChange = () => {
    setOnlyInStock(!onlyInStock);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleProductSelect = (product) => {
    const index = selectedProducts.indexOf(product);
    if (index !== -1) {
      setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form inline>
            <Input
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={handleSearch}
            />
            <Button color="success" onClick={handleCheckboxChange}>
              {onlyInStock ? "Show All Products" : "Show In-Stock Products"}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>In Stock</th>
                <th>Price</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.name}>
                  <td>{product.category}</td>
                  <td>{product.name}</td>
                  <td style={{ color: product.inStock ? "green" : "red" }}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </td>
                  <td>${product.price}</td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleProductSelect(product)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Total price: ${totalCost.toFixed(2)}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductList;
