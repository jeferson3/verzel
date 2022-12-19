import "./style.css";
import {Form, InputGroup} from "react-bootstrap";
import {VehicleListFilter} from "./VehicleFilter";
import {IVehicle} from "../../../../types/context_vehicle";
import {CardVehicleContainer} from "../VehicleCard";

type Props = {
    vehicles: Array<IVehicle>
}
export const VehicleList: React.FC<Props> = ({ vehicles }) => {
    return (

        <div className="d-flex p-5">
            <div className="d-flex flex-column">
                <VehicleListFilter />
            </div>
            <div className="d-flex flex-column px-5">
                <CardVehicleContainer vehicles={vehicles} />
            </div>
        </div>
    );
}
