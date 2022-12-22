import "./style.css";
import {useEffect, useRef, useState} from "react";
import {useAdminContext} from "../../../Context/Admin/context";
import {getVehicles} from "../../../Context/Admin/actions";
import {Menu} from "../../../Components/Menu";
import {Button, Container, Dropdown, Table} from "react-bootstrap";
import {ModalAddNewVehicle} from "../../../Components/Admin/Vehicle/ModalAdd";
import {getBrands, getModels} from "../../../Context/Public/VehicleContext/actions";
import {useVehicleContext} from "../../../Context/Public/VehicleContext/context";
import {VehiclePagination} from "../../../Components/Admin/Vehicle/Pagination";
export const VehicleAdmin = () => {

    const { state: { vehicles }, dispatch } = useAdminContext();
    const vehicleContext = useVehicleContext();
    const isMounted = useRef(true);

    const [ showModalAdd, setShowModalAdd ] = useState<boolean>(false);

    useEffect(function () {
        if (isMounted.current) {
            (
               async function () {
                   await Promise.all([
                       getVehicles(1, 5, dispatch),
                       getBrands(false, vehicleContext.dispatch),
                       getModels(false, vehicleContext.dispatch)
                   ])
               }
            )()
        }
        return () => {
            isMounted.current = false;
        }
    })

    return (
        <div>
            <Menu isLoginPage={false} isSitePage={false}/>
            <Container>
                <h3>Veículos</h3>
                <hr/>
                <div className={'text-end'}>
                    <Button onClick={e => setShowModalAdd(true)}>
                        <i className={'fas fa-plus'}></i>
                        <span className={'ms-1'}>Novo</span>
                    </Button>
                </div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Preço</th>
                        <th>Imagem</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        vehicles.data.length > 0 && vehicles.data.map((v, index) => (

                            <tr key={index}>
                                <td>{v.id}</td>
                                <td>{v.name}</td>
                                <td>{v.brand?.name}</td>
                                <td>{v.model?.name}</td>
                                <td>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(v.price)}</td>
                                <td>{
                                    v.photo &&
                                    <Button>
                                        <i className="fas fa-image"></i>
                                    </Button>
                                }</td>
                                <td>
                                    <Dropdown align={'end'}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <i className={'fas fa-list'}></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">
                                                <i className={'fas fa-edit text-primary'}></i>
                                                <span className={'ms-1'}>Editar</span>
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">
                                                <i className={'fas fa-trash text-danger'}></i>
                                                <span className={'ms-1'}>Deletar</span>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                <VehiclePagination vehicles={vehicles.data} />
                <ModalAddNewVehicle show={showModalAdd} setShow={setShowModalAdd} />

            </Container>
        </div>
    )
}