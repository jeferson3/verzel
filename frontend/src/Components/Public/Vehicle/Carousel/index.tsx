import React from "react";

// @ts-ignore
import { Carousel } from "react-bootstrap";
import {CarouselItem} from "../../../Styled/Carousel";

import "./style.css";
import {IVehicle} from "../../../../types/Public/context_vehicle";

type Props = {
    vehicles: Array<IVehicle>
}

export const CarouselVehicle: React.FC<Props> = ({ vehicles }) => {

    console.log('vehicles', vehicles)
    return (
        <Carousel variant="dark">
            {
                vehicles && vehicles.map((vehicle, index) => (
                    <CarouselItem path={vehicle.image} key={index} >
                        <Carousel.Caption>
                            <h5>{vehicle.name}</h5>
                            <p>{vehicle.description}</p>
                        </Carousel.Caption>
                    </CarouselItem>
                ))
            }
        </Carousel>
    );
}