import {Button, Card, Col, Row} from "react-bootstrap";

import "./style.css";
import {IVehicle} from "../../../../types/context_vehicle";

type MainProps = {
    vehicles: Array<IVehicle>
}

type Props = {
    vehicle: IVehicle
}

export const CardVehicleContainer: React.FC<MainProps> = ({vehicles}) => {
    return (
        <div className="row m-0 justify-content-around align-items-center p-5">
            {
                vehicles.map((v, index) => (
                    <div key={index} className="col col-md-4 align-self-center text-center m-0">
                        <CardVehicle vehicle={v} />
                    </div>
                ))
            }
        </div>
    );
}
const CardVehicle: React.FC<Props> = ({vehicle}) => {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={vehicle.image}/>
            <Card.Body>
                <Card.Title>{vehicle.name}</Card.Title>
                <Card.Text>
                    {vehicle.description.substring(0, 100) + "..."}
                </Card.Text>
                <Button variant="primary">Visualizar</Button>
            </Card.Body>
        </Card>
    );
}
