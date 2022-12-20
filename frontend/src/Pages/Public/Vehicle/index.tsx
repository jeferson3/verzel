import "./style.css";
import {Menu} from "../../../Components/Public/Menu";
import {VehicleList} from "../../../Components/Public/Vehicle/VehicleList";
import {useVehicleContext} from "../../../Context/Public/VehicleContext/context";
import {useEffect, useRef} from "react";
import {getBrands, getModels, getVehicles} from "../../../Context/Public/VehicleContext/actions";

export const Vehicle = () => {


    const {state: {vehicles, brands, models}, dispatch} = useVehicleContext();
    const isMounted = useRef(true);

    useEffect(function () {
        if (isMounted.current) {

            (
                async () => {
                    await Promise.all([
                        getVehicles(1, 5, {}, dispatch),
                        getBrands(false, dispatch),
                        getModels(false, dispatch)
                    ]);
                }
            )()
        }
        return () => {
            isMounted.current = false;
        }
    });

    return (
        <>
            <Menu />
            <VehicleList vehicles={vehicles.data} brands={brands.data} models={models.data} />
        </>
    )
}