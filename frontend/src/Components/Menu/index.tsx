import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import "./style.css";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../Context/Auth/context";
import {isAuthtenticated, logout} from "../../Context/Auth/actions";
import React, {useEffect} from "react";
import history from "../../Services/History";


type Props = {
    isLoginPage: boolean
    isSitePage: boolean
}

export const Menu: React.FC<Props> = ({ isLoginPage, isSitePage }) => {

    const { state, dispatch } = useAuthContext();
    const { user, token } = state;

    // useEffect(function () {
    //     if (!isAuthtenticated(state)) {
    //         history.push('/')
    //     }
    // }, [user, token])

    return (
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <Image src={process.env.PUBLIC_URL + "/logo.webp"} className="imageLogo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    {
                        !isLoginPage &&
                        <Nav className="ms-auto nav-menu">
                            {
                                isSitePage && <>
                                    <Nav.Link as={Link} to="/site/veiculos">Nossos veículos</Nav.Link>
                                    <Nav.Link as={Link} to="/site/veiculos">Anunciar veículo</Nav.Link>
                                    <Nav.Link as={Link} to="/site/veiculos">Visite a loja</Nav.Link>
                                    <Nav.Link as={Link} to="/site/veiculos">Trabalhe conosco</Nav.Link>
                                </>
                            }
                            {
                                isAuthtenticated(state) && !isSitePage && <>
                                    <Nav.Link as={Link} to="/admin/veiculos">Veículos</Nav.Link>
                                </>
                            }
                                <Nav.Item className="btn-adm ms-4">
                                    {
                                        isSitePage &&
                                        <Link
                                            className="btn btn-outline-primary"
                                            role={"button"}
                                            to={"/auth/login"}
                                        >
                                            Área administrativa
                                        </Link>
                                    }
                                    {
                                        isAuthtenticated(state) && !isSitePage &&
                                        <Button
                                            onClick={e => logout(dispatch)}
                                        >
                                            <span>Logout</span>
                                            <i className="fas fa-sign-out-alt ms-2"></i>
                                        </Button>
                                    }
                                </Nav.Item>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
}