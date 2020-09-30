import React from 'react';
import Header from './containers/Header.jsx';
import SearchBar from './containers/SearchBar.jsx';
import SideBar from './containers/SideBar.jsx';
import MainGallery from './containers/MainGallery.jsx';
import Footer from './containers/Footer.jsx';
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  return (
    <div id='App'>
      <Container fluid>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchBar />
          </Col>
        </Row>
        <Row>
          <Col sm={2} xl={1}>
            <SideBar />
          </Col>
          <Col sm={10} xl={11}>
            <MainGallery />
          </Col>
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;