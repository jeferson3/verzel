import "./style.css";
import {useVehicleContext} from "../../../Context/Public/VehicleContext/context";
import {getVehicles} from "../../../Context/Public/VehicleContext/actions";
import {useEffect, useRef} from "react";
import {Menu} from "../../../Components/Public/Menu";
import {CarouselVehicle} from "../../../Components/Public/Vehicle/Carousel";
import {CardVehicleContainer} from "../../../Components/Public/Vehicle/VehicleCard";
import {FooterContainer} from "../../../Components/Public/Vehicle/VehicleFooter";

export const Home = () => {

    const {state: {vehicles}, dispatch} = useVehicleContext();
    const isMounted = useRef(true);

    useEffect(function () {
        if (isMounted.current) {
            getVehicles(1, 3, "", dispatch);
        }
        return () => {
            isMounted.current = false;
        }
    });

    return (
        <>
            <Menu />
            <CarouselVehicle vehicles={vehicles.data} />
            <div className='pt-5'>
                <CardVehicleContainer vehicles={vehicles.data} showPrice={false} />
            </div>
            <FooterContainer />
        </>
    )
}