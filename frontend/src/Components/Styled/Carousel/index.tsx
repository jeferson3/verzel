import Styled from "styled-components";
import { Carousel } from "react-bootstrap";

export const CarouselItem = Styled(Carousel.Item)<{ path: string }>`
    background-image: url("${ props => props.path }");
    background-size: cover;
    background-position: center;
`

