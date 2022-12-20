import "./style.css";
import {Form, Pagination} from "react-bootstrap";
import {IVehicle} from "../../../../../types/Public/context_vehicle";
import {useVehicleContext} from "../../../../../Context/Public/VehicleContext/context";
import {getVehicles} from "../../../../../Context/Public/VehicleContext/actions";

type Props = {
    vehicles: Array<IVehicle>
}

export const VehicleListPagination: React.FC<Props> = ({ vehicles }) => {

    const {state: {vehicles: {page, pages}}, dispatch} = useVehicleContext();
    const totalPages = Object.keys(new Array(pages).fill(null)).map(Number)

    const paginateVehicles = (pageNumber: number) => {
        getVehicles(pageNumber, 5, {}, dispatch);
    }

    return (

        <Pagination>
            <Pagination.Prev disabled={page === 1} />
            {
                totalPages.map((p, index) => (
                    <Pagination.Item key={index} active={(p + 1) === page}  onClick={e => paginateVehicles(p + 1)}>
                        {p+1}
                    </Pagination.Item>
                )
                )
            }
            <Pagination.Next disabled={page === pages} />
        </Pagination>
    );
}
