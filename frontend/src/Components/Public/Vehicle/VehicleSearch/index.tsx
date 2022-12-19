import "./style.css";
import {Form, InputGroup} from "react-bootstrap";
import {useVehicleContext} from "../../../../Context/Public/VehicleContext/context";
import {getVehicles} from "../../../../Context/Public/VehicleContext/actions";
import React, {useState} from "react";

export const VehicleSearch: React.FC = () => {


    const {state: {vehicles: {page, pages}}, dispatch} = useVehicleContext();
    const totalPages = Object.keys(new Array(pages).fill(null)).map(Number)

    const searchVehicles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;

        if (search.length > 3) {
            getVehicles(1, 5, search, dispatch);
        }
    }

    return (

        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={searchVehicles}
                />
                <InputGroup.Text id="inputGroup-sizing-sm">
                    <i className="fas fa-search"></i>
                </InputGroup.Text>
            </InputGroup>
        </div>
    );
}
