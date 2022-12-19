import {Button, Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./style.css";
import {Link} from "react-router-dom";

export const Menu = () => {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <Image src={process.env.PUBLIC_URL + "/logo.webp"} className="imageLogo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto nav-menu">
                        <Nav.Link as={Link} to="/site/veiculos">Nossos veículos</Nav.Link>
                        <Nav.Link as={Link} to="/site/veiculos">Anunciar veículo</Nav.Link>
                        <Nav.Link as={Link} to="/site/veiculos">Visite a loja</Nav.Link>
                        <Nav.Link as={Link} to="/site/veiculos">Trabalhe conosco</Nav.Link>
                        <Nav.Item className="btn-adm ms-4">
                            <Button variant="outline-primary">
                                Área administrativa
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
}