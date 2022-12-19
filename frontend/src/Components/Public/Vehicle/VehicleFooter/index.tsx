import "./style.css";
import {Link} from "react-router-dom";
import {Button, Image, Nav} from "react-bootstrap";

export const FooterContainer: React.FC = () => {
    return (

        <div className="d-flex justify-content-around p-5" style={{backgroundColor: "rgb(0 0 0 / 75%)" }}>
            <div className="d-flex flex-column">
                <Link to="/">
                    <Image src={process.env.PUBLIC_URL + "/logo.webp"} className="imageLogo" />
                </Link>
            </div>
            <div className="d-flex flex-column text-left">
                <Nav.Link as={Link} to="/site/veiculos">Nossos veículos</Nav.Link>
                <Nav.Link as={Link} to="/site/veiculos">Anunciar veículo</Nav.Link>
                <Nav.Link as={Link} to="/site/veiculos">Visite a loja</Nav.Link>
                <Nav.Link as={Link} to="/site/veiculos">Trabalhe conosco</Nav.Link>
            </div>
            <div className="d-flex flex-column text-left">
                <Nav.Link as={Link} to="/site/veiculos">Nossos veículos</Nav.Link>
                <Nav.Link as={Link} to="/site/veiculos">Anunciar veículo</Nav.Link>
                <Nav.Link as={Link} to="/site/veiculos">Visite a loja</Nav.Link>
                <Nav.Link as={Link} to="/site/veiculos">Trabalhe conosco</Nav.Link>
                <Nav.Item className="btn-adm">
                    <Button variant="outline-primary">
                        Área administrativa
                    </Button>
                </Nav.Item>
            </div>
        </div>
    );
}
