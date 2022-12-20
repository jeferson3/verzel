import "./style.css";
import {VehicleListFilter} from "./VehicleFilter";
import {IBrand, IModel, IVehicle} from "../../../../types/Public/context_vehicle";
import {CardVehicleContainer} from "../VehicleCard";
import {VehicleSearch} from "../VehicleSearch";
import {VehicleListPagination} from "./VehicleListPagination";
import {useVehicleContext} from "../../../../Context/Public/VehicleContext/context";
import {Alert} from "react-bootstrap";

type Props = {
    vehicles: Array<IVehicle>,
    brands: Array<IBrand>,
    models: Array<IModel>,
}
export const VehicleList: React.FC<Props> = ({ vehicles , brands, models }) => {

    const {state: {vehicles: {total}}} = useVehicleContext();

    return (

        <div className="row m-0 mt-5">
            <div className="col col-md-3 p-5 filter">
                <VehicleListFilter brands={brands} models={models} />
            </div>
            <div className="col col-md-9">
                <div className="row m-0 justify-content-around align-items-center px-2">
                    <div className="col col-md-6">
                        <strong>Total registros: </strong><span>{total}</span>
                    </div>
                    <div className="col col-md-6">
                        <VehicleSearch />
                    </div>
                </div>
                {
                    vehicles && vehicles.length === 0 && <Alert variant={'warning'}>Nenhum registro encontrado!</Alert>
                }
                {
                    vehicles && vehicles.length > 0 && <>
                        <CardVehicleContainer vehicles={vehicles} showPrice={true} />
                        <div className="d-flex justify-content-center">
                            <VehicleListPagination vehicles={vehicles} />
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
