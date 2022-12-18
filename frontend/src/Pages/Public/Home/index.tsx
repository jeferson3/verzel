import "./style.css";
import {Link} from "react-router-dom";
import {useVehicleContext} from "../../../Context/Public/VehicleContext/context";
import {getVehicles} from "../../../Context/Public/VehicleContext/actions";
import {useEffect} from "react";

export const Home = () => {

    const {state: {vehicles}, dispatch} = useVehicleContext();
    const isMounted = useRef

    useEffect(function () {
        getVehicles(vehicles.page, vehicles.per_page, dispatch)
    })

    return (
        <div>
            <h1>Home Page</h1>
            <Link to="/site/veiculos-usados">Nossos veículos</Link>
        </div>
    )
}