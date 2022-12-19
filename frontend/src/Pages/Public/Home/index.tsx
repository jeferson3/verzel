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
            // getVehicles(vehicles.page, vehicles.per_page, dispatch);
        }
        return () => {
            isMounted.current = false;
        }
    });

    const images = [
        {
            title: "Slide 1",
            description: "when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            path: process.env.PUBLIC_URL + "/carousel/slide1.jpg"
        },
        {
            title: "Slide 2",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
            path: process.env.PUBLIC_URL + "/carousel/slide2.png"
        },
        {
            title: "Slide 3",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the " +
                "1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
            path: process.env.PUBLIC_URL + "/carousel/slide3.png"
        },
    ];

    return (
        <>
            <Menu />
            <CarouselVehicle images={images} />
            <div className='pt-5'>
                <CardVehicleContainer images={images} />
            </div>
            <FooterContainer />
        </>
    )
}