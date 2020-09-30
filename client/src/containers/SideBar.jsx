import React from 'react';
import { 
  Nav,
  NavDropdown,
  Accordion,
  Card,
  Button
} from 'react-bootstrap';

const SideBar = () => {
  return (
    <>
    <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Tags
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body><a href="#link">Link</a></Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>Hello! I'm another body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
      {/* <Nav 
        className="col-md-12 d-sm-block bg-light sidebar"
        activeKey="/home"
      onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      > */}
          {/* <div className="sidebar-sticky"></div> */}
      {/* <Nav.Item>
          <h4>Filter</h4>
      </Nav.Item>
      <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
          Disabled
          </Nav.Link>
      </Nav.Item>
      </Nav> */}
    </>
  )
}

export default SideBar;