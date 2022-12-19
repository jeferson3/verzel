import "./style.css";
import {Form, InputGroup} from "react-bootstrap";

export const VehicleSearch: React.FC = () => {
    return (

        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                />
                <InputGroup.Text id="inputGroup-sizing-sm">
                    <i className="fas fa-search"></i>
                </InputGroup.Text>
            </InputGroup>
        </div>
    );
}
