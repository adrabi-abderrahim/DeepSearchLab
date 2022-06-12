import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import GenerationZ from './components/GenerationZ/GenerationZ.lazy';
import YoungPeople from './components/YoungPeople/YoungPeople.lazy';

function App() {
  return (
    <>
      <NavBar bg='light' expand='lg'>
        <Container fluid>
          <NavBar.Brand href='#generation-z'>
            DeepSearch Labs
          </NavBar.Brand>
          <NavBar.Toggle aria-controls="basic-navbar-nav" />
          <NavBar.Collapse>
            <Nav.Link href="#generation-z">Generation Z</Nav.Link>
            <Nav.Link href="#young-people">Young People</Nav.Link>
          </NavBar.Collapse>
        </Container>
      </NavBar>
      <GenerationZ></GenerationZ>
    </>
  );
}

export default App;
