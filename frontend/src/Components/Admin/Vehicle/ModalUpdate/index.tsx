import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import "./style.css";
import React, {useEffect, useState} from "react";
import {useVehicleContext} from "../../../../Context/Public/VehicleContext/context";
import {updateVehicle} from "../../../../Context/Admin/actions";
import {useAdminContext} from "../../../../Context/Admin/context";
import {IBrand, IModel, IVehicle} from "../../../../types/Admin/context_admin";


type Props = {
    vehicle: IVehicle,
    show: boolean,
    setShow: Function,
}

export const ModalUpdateVehicle: React.FC<Props> = ({vehicle, show, setShow}) => {

    const {state: {brands, models}} = useVehicleContext();
    const {state: {loading}, dispatch} = useAdminContext();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [brandId, setBrandId] = useState<IBrand>();
    const [modelId, setModelId] = useState<IModel>();

    const updateHandler = () => {
        const brand = {
            id: brandId?.id ?? 0,
            name: brandId?.name ?? "",
        };
        const model = {
            id: modelId?.id ?? 0,
            name: modelId?.name ?? "",
        };

        updateVehicle(
            vehicle.id,
            {
                id: 0,
                name,
                description,
                photo,
                price,
                brand,
                model
            },
            clearForm,
            setShow,
            dispatch)
    }

    useEffect(function () {
        if (show){
            setName(vehicle.name);
            setDescription(vehicle.description);
            setPrice(vehicle.price);
            setBrandId(vehicle.brand);
            setModelId(vehicle.model);
        }
    }, [vehicle])

    const clearForm = () => {
        setName("");
        setDescription("");
        setPrice(0);
        setBrandId(vehicle.brand);
        setModelId(vehicle.model);
    }

    const setModelIdHandler = (id: number) => {
        setModelId(models.data.filter(m => m.id === id)[0]);
    }

    const setBrandIdHandler = (id: number) => {
        setBrandId(brands.data.filter(b => b.id === id)[0]);
    }

    const setPhotoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target?.files ?? [];
        const reader = new FileReader();
        reader.onloadend = function () {
            setPhoto((reader?.result?.toString() ?? '') + '+-' + f[0].name);
        };
        reader.readAsDataURL(f[0]);
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            fullscreen={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Atualizar Veículo #{vehicle.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <fieldset disabled={loading}>
                        <Row>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.FloatingLabel controlId={'nome'} label={'Nome'}>
                                        <Form.Control defaultValue={vehicle.name} placeholder={'Nome'}
                                                      onChange={e => setName(e.target.value)}/>
                                    </Form.FloatingLabel><br/>
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.FloatingLabel controlId={'preco'} label={'Preço'}>
                                        <Form.Control type={'number'} defaultValue={Number(vehicle.price)} placeholder={'Preço'}
                                                      onChange={e => setPrice(Number(e.target.value))}/>
                                    </Form.FloatingLabel><br/>
                                </Form.Group>
                            </Col>
                            <Col md={12} className={"mb-4"}>
                                <Form.Group>
                                    <Form.FloatingLabel controlId="floatingSelect1" label="Marcas">
                                        <Form.Select aria-label="Default select example"
                                                     onChange={e => setBrandIdHandler(Number(e.target.value))}
                                                     defaultValue={vehicle.brand.id}
                                        >
                                            <option>-- selecione --</option>
                                            {
                                                brands.data.map((b, index) => (
                                                    <option key={index} value={b.id}>{b.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={12} className={"mb-4"}>
                                <Form.Group>
                                    <Form.FloatingLabel controlId="floatingSelect2" label="Modelos">
                                        <Form.Select aria-label="Default select example"
                                                     onChange={e => setModelIdHandler(Number(e.target.value))}
                                                     defaultValue={vehicle.model.id}
                                        >
                                            <option>-- selecione --</option>
                                            {
                                                models.data.map((m, index) => (
                                                    <option key={index} value={m.id}>{m.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={12} className={"mb-5"}>
                                <Form.Group>
                                    <Form.FloatingLabel controlId="floatingFile" label="Imagem">
                                        <Form.Control type={'file'} onChange={setPhotoHandler}/>
                                    </Form.FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={12} className={"mb-5"}>
                                <Form.Group>
                                    <Form.FloatingLabel controlId="floatingTextarea2" label="Descrição">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Descrição"
                                            style={{height: '100px'}}
                                            onChange={e => setDescription(e.target.value)}
                                            defaultValue={vehicle.description}
                                        />
                                    </Form.FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>
                    </fieldset>
                    <div className={"text-center"}>
                        <Button
                            variant={'primary'}
                            onClick={updateHandler}
                            disabled={loading || !name || !description || !price || !brandId || !modelId}
                        >
                            <span>Atualizar</span>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}