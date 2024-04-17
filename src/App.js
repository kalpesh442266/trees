import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./App.css";
import Tree from "./tree";

export default function App() {
  return (
    <div className="App">
      <Container>
       
       <Row>
          <Col sm={6}>
            <Tree />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
