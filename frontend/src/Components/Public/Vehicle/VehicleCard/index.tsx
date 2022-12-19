import {Button, Card, Col, Row} from "react-bootstrap";

import "./style.css";

type MainProps = {
    images: Array<ImageI>
}

type Props = {
    image: ImageI
}

interface ImageI {
    path: string,
    title: string,
    description: string
}

export const CardVehicleContainer: React.FC<MainProps> = ({images}) => {
    return (
        <div className="d-flex m-0 justify-content-around align-items-center p-5">
            {
                images.map((img, index) => (
                    <div key={index} className="d-flex flex-column align-self-center text-center m-0">
                        <CardVehicle image={img} />
                    </div>
                ))
            }
        </div>
    );
}
const CardVehicle: React.FC<Props> = ({image}) => {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={image.path}/>
            <Card.Body>
                <Card.Title>{image.title}</Card.Title>
                <Card.Text>
                    {image.description.substring(0, 100) + "..."}
                </Card.Text>
                <Button variant="primary">Visualizar</Button>
            </Card.Body>
        </Card>
    );
}
