import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import GenerationZ from './components/GenerationZ/GenerationZ.lazy';
import YoungPeople from './components/YoungPeople/YoungPeople.lazy';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Since this is just a demo will not use routers.
    this.state = {
      firstLink: true
    };
  }

  render() {
    return (<>
      <NavBar bg='light' expand='lg'>
        <Container fluid>
          <NavBar.Brand>
            DeepSearch Labs
          </NavBar.Brand>
          <NavBar.Toggle aria-controls="basic-navbar-nav" />
          <NavBar.Collapse>
            <Nav.Link onClick={() => this.setState({firstLink: true})} >Generation Z</Nav.Link>
            <Nav.Link onClick={() => this.setState({firstLink: false})}>Young People</Nav.Link>
          </NavBar.Collapse>
        </Container>
      </NavBar>
      {
        this.state.firstLink ? <GenerationZ></GenerationZ> : <YoungPeople></YoungPeople>
      }
    </>)
  }
}
export default App;
