import "./style.css";
import {Button, Form, InputGroup} from "react-bootstrap";
import {useVehicleContext} from "../../../../Context/Public/VehicleContext/context";
import {getVehicles} from "../../../../Context/Public/VehicleContext/actions";
import React, {useState} from "react";

export const VehicleSearch: React.FC = () => {

    const {dispatch} = useVehicleContext();
    const [search, setSearch] = useState("");

    const searchVehicles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);

        if (e.target.value.length > 3) {
            getVehicles(1, 5, {search}, dispatch);
        }
    }

    const clearSearch = () => {
        setSearch("");
        getVehicles(1, 5, {}, dispatch);
    }

    return (

        <div>
            <InputGroup className="mb-3">
                {search !== "" && <Button variant='secondary' onClick={clearSearch}>Limpar</Button>}
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={searchVehicles}
                    value={search}
                />
                <InputGroup.Text id="inputGroup-sizing-sm">
                    <i className="fas fa-search"></i>
                </InputGroup.Text>
            </InputGroup>
        </div>
    );
}
