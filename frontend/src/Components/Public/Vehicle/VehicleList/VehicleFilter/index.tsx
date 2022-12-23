import "./style.css";
import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {IBrand, IModel} from "../../../../../types/Public/context_vehicle";
import {getVehicles} from "../../../../../Context/Public/VehicleContext/actions";
import {useVehicleContext} from "../../../../../Context/Public/VehicleContext/context";

type Props = {
    brands: Array<IBrand>,
    models: Array<IModel>,
}
export const VehicleListFilter: React.FC<Props> = ({brands, models}) => {

    const {dispatch} = useVehicleContext();

    const [startPrice, setStartPrice] = useState(0);
    const [endPrice, setEndPrice] = useState(0);
    const [brandId, setBrandId] = useState<number>();
    const [modelId, setModelId] = useState<number>();


    const filterVehicles = () => {

        getVehicles(1, 10, {
                startPrice,
                endPrice,
                brandId,
                search: "",
                modelId
            },
            dispatch)
    }


    return (

        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Preço</Form.Label><br/>
                    De: <Form.Range min={10000} step={10000} max={1000000} value={startPrice}
                                    onChange={e => setStartPrice(Number(e.target.value))}/>{startPrice}<br/>
                    Até: <Form.Range min={10000} step={10000} max={1000000} value={endPrice}
                                     onChange={e => setEndPrice(Number(e.target.value))}/>{endPrice}
                </Form.Group>
                <hr/>
                <Form.Group>
                    <Form.Label>Marca</Form.Label><br/>
                    <Form.Select aria-label="Default select example" onChange={e => setBrandId(Number(e.target.value))}>
                        <option>-- selecione --</option>
                        {
                            brands && brands.map((b, index) => (
                                <option key={index} value={b.id}>{b.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <hr/>
                <Form.Group>
                    <Form.Label>Modelos</Form.Label><br/>
                    <Form.Select aria-label="Default select example" onChange={e => setModelId(Number(e.target.value))}>
                        <option>-- selecione --</option>
                        {
                            models && models.map((m, index) => (
                                <option key={index} value={m.id}>{m.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <hr/>
                <div className={"text-center"}>
                    <Button variant={'primary'} onClick={filterVehicles}>Filtrar</Button>
                </div>
            </Form>
        </div>
    );
}
