import "./style.css";
import {Form, InputGroup} from "react-bootstrap";
import {VehicleListFilter} from "./VehicleFilter";
import {IVehicle} from "../../../../types/context_vehicle";
import {CardVehicleContainer} from "../VehicleCard";
import {VehicleSearch} from "../VehicleSearch";
import {VehicleListPagination} from "./VehicleListPagination";

type Props = {
    vehicles: Array<IVehicle>
}
export const VehicleList: React.FC<Props> = ({ vehicles }) => {
    return (

        <div className="row mt-5">
            <div className="col col-md-2">
                <VehicleListFilter />
            </div>
            <div className="col col-md-10">
                <div className="row m-0 justify-content-around align-items-center px-5">
                    <div className="col col-md-12">
                        <VehicleSearch />
                    </div>
                </div>
                <CardVehicleContainer vehicles={vehicles} showPrice={true} />

                <div className="d-flex justify-content-center">
                    <VehicleListPagination vehicles={vehicles} />
                </div>

            </div>
        </div>
    );
}
