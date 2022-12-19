import "./style.css";
import {Menu} from "../../../Components/Public/Menu";
import {VehicleSearch} from "../../../Components/Public/Vehicle/VehicleSearch";
import {VehicleList} from "../../../Components/Public/Vehicle/VehicleList";
import {useVehicleContext} from "../../../Context/Public/VehicleContext/context";
import {useEffect, useRef} from "react";
import {getVehicles} from "../../../Context/Public/VehicleContext/actions";

export const Vehicle = () => {


    const {state: {vehicles}, dispatch} = useVehicleContext();
    const isMounted = useRef(true);

    useEffect(function () {
        if (isMounted.current) {
            getVehicles(1, 5, dispatch);
        }
        return () => {
            isMounted.current = false;
        }
    });

    return (
        <>
            <Menu />
            <VehicleList vehicles={vehicles.data} />
        </>
    )
}