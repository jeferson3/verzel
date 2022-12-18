import "./style.css";
import {useEffect} from "react";
import {useVehicleContext} from "../../../Context/Public/VehicleContext/context";
import {getVehicles} from "../../../Context/Public/VehicleContext/actions";
export const Vehicle = () => {

    // const {state: {vehicles}, dispatch} = useVehicleContext();
    //
    // useEffect(function () {
    //     getVehicles(vehicles.page, vehicles.per_page, dispatch)
    // }, [vehicles, dispatch])

    return (
        <div>
            <h1>Page Vehicles</h1>
        </div>
    )
}