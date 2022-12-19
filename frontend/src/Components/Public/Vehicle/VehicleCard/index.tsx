import {Button, Card, Col, Row} from "react-bootstrap";

import "./style.css";
import {IVehicle} from "../../../../types/context_vehicle";
import {Link} from "react-router-dom";

type MainProps = {
    vehicles: Array<IVehicle>,
    showPrice: boolean
}

type Props = {
    vehicle: IVehicle,
    showPrice: boolean
}

export const CardVehicleContainer: React.FC<MainProps> = ({vehicles, showPrice}) => {
    return (
        <div className="row m-0 justify-content-around align-items-center p-5">
            {
                vehicles.map((v, index) => (
                    <div key={index} className="col col-md-4 align-self-center text-center m-0">
                        <CardVehicle vehicle={v} showPrice={showPrice} />
                    </div>
                ))
            }
        </div>
    );
}
const CardVehicle: React.FC<Props> = ({vehicle, showPrice}) => {
    return (
        <Card style={{width: '18rem', marginBottom: '10px'}}>
            <Card.Img variant="top" src={vehicle.image}/>
            <Card.Body>
                <Card.Title>{vehicle.name}</Card.Title>
                <Card.Text>
                    {vehicle.description.substring(0, 50) + "..."}
                </Card.Text>
                {!showPrice && <Link to='site/veiculos'>Visualizar</Link>}
                {
                    showPrice &&
                    <div className='d-flex justify-content-around align-items-center'>
                        <div className='d-flex flex-column'>
                            <span className="fw-bold text-primary">{vehicle.value}</span>
                        </div>
                        <div className='d-flex flex-column'>
                            <Button variant='outline-primary'>Comprar</Button>
                        </div>
                    </div>
                }
            </Card.Body>
        </Card>
    );
}
