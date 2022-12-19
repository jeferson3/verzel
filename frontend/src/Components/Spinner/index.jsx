import { Spinner } from "react-bootstrap"
import { useVehicleContext } from "../../Context/Public/VehicleContext/context";
import { Container } from "../Styled/Container"

export function SpinnerContainer() {

    const { state: { loading }, } = useVehicleContext();

    return (
        <>
            {!!loading && <Container centered={true} overlay={true} height={100}>
                <Spinner animation="grow" />
            </Container>}
        </>
    )
}