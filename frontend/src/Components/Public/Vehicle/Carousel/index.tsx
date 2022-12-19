import React from "react";

// @ts-ignore
import { Carousel } from "react-bootstrap";
import {CarouselItem} from "../../../Styled/Carousel";

import "./style.css";

type Props = {
    images: Array<ImageI>
}

interface ImageI {
    path: string,
    title: string,
    description: string
}

export const CarouselVehicle: React.FC<Props> = ({ images }) => {

    return (
        <Carousel variant="dark">
            {
                images.map((img, index) => (
                    <CarouselItem path={img.path} key={index} >
                        <Carousel.Caption>
                            <h5>{img.title}</h5>
                            <p>{img.description}</p>
                        </Carousel.Caption>
                    </CarouselItem>
                ))
            }
        </Carousel>
    );
}