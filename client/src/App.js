import React from 'react';
import Login from './Login';
import Header from './containers/Header.jsx';
import SearchBar from './containers/SearchBar.jsx';
import SideBar from './containers/SideBar.jsx';
import MainGallery from './containers/MainGallery.jsx';
import Footer from './containers/Footer.jsx';
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  return (
    <div id='App'>
      <Login />
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
          <Col sm={3} xl={2}>
            <SideBar />
          </Col>
          <Col sm={9} xl={10}>
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