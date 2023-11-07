import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
const Header = ()=>{
    const Navigate = useNavigate();
    return (
        <>
        {/* Barra de navegación del header */}
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
           
            <Nav.Link onClick={() => Navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => Navigate('/componentes')}>Componentes</Nav.Link>
            <Nav.Link onClick={() => Navigate('/administracion')}>Administracion</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
} 
export default Header;