import "./style.css";
import {Pagination} from "react-bootstrap";
import {useAdminContext} from "../../../../Context/Admin/context";
import {getVehicles} from "../../../../Context/Admin/actions";
import {IVehicle} from "../../../../types/Admin/context_admin";
import React from "react";

type Props = {
    vehicles: Array<IVehicle>
}

export const VehiclePagination: React.FC<Props> = ({vehicles}) => {

    const {state: {vehicles: {page, pages}}, dispatch} = useAdminContext();
    const totalPages = Object.keys(new Array(pages).fill(null)).map(Number)

    const paginateVehicles = (pageNumber: number) => {
        getVehicles(pageNumber, 10, dispatch);
    }

    return (
        <div className={'d-flex justify-content-center'}>
            <Pagination>
                <Pagination.Prev disabled={page === 1}/>
                {
                    totalPages.map((p, index) => (
                            <Pagination.Item key={index} active={(p + 1) === page} onClick={e => paginateVehicles(p + 1)}>
                                {p + 1}
                            </Pagination.Item>
                        )
                    )
                }
                <Pagination.Next disabled={page === pages}/>
            </Pagination>
        </div>
    );
}
