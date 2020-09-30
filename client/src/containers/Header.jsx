import React from 'react';
import { Button, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <div id="header">
      <Button variant="outline-primary">Primary</Button>{' '}
    </div>
    // <Navbar bg="light" variant="light">
    //   <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    //   <Nav className="mr-auto">
    //     <Nav.Link href="#home">Home</Nav.Link>
    //     <Nav.Link href="#features">Features</Nav.Link>
    //     <Nav.Link href="#pricing">Pricing</Nav.Link>
    //   </Nav>
    //   <Form inline>
    //     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //     <Button variant="outline-primary">Search</Button>
    //   </Form>
    // </Navbar>
  )
}

export default Header;