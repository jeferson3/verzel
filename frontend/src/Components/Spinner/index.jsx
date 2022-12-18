import { Spinner } from "react-bootstrap"
import { useRepositoryContext } from "../../Context/Public/VehicleContext/context";
import { Container } from "../Container"

export function SpinnerContainer() {

    const { state: { loading }, } = useRepositoryContext();

    return (
        <>
            {!!loading && <Container centered={true} overlay={true} height={100}>
                <Spinner animation="grow" />
            </Container>}
        </>
    )
}