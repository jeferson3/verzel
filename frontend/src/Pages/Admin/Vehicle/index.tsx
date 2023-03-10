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
import {ModalShowVehicleImage} from "../../../Components/Admin/Vehicle/ModalShowImage";
import {ModalDeleteVehicle} from "../../../Components/Admin/Vehicle/ModalDelete";
import {IVehicle} from "../../../types/Admin/context_admin";
import {ModalUpdateVehicle} from "../../../Components/Admin/Vehicle/ModalUpdate";
export const VehicleAdmin = () => {

    const { state: { vehicles }, dispatch } = useAdminContext();
    const vehicleContext = useVehicleContext();
    const isMounted = useRef(true);

    const [ showModalAdd, setShowModalAdd ] = useState<boolean>(false);
    const [ showModalDelete, setShowModalDelete ] = useState<boolean>(false);
    const [ showModalUpdate, setShowModalUpdate ] = useState<boolean>(false);
    const [ showImageModal, setShowImageModal ] = useState<boolean>(false);
    const [ imageModal, setImageModal ] = useState<string>("");
    const [ idModal, setIdModal ] = useState<number>(0);
    const [ vehicleModal, setVehicleModal ] = useState<IVehicle>({id: 0, name: '', description: '', price: 0, brand: {id: 0, name: ''}, model: {id: 0, name: ''}, photo: ''});

    useEffect(function () {
        if (isMounted.current) {
            (
               async function () {
                   await Promise.all([
                       getVehicles(1, 10, dispatch),
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

    const showImageModalHandler = (image: string) => {
        setImageModal(image);
        setShowImageModal(true);
    }

    const showDeleteModalHandler = (id: number) => {
        setIdModal(id);
        setShowModalDelete(true);
    }

    const showUpdateModalHandler = (vehicle: IVehicle) => {
        setVehicleModal(vehicle);
        setShowModalUpdate(true);
    }

    return (
        <div>
            <Menu isLoginPage={false} isSitePage={false}/>
            <Container>
                <h3>Ve??culos</h3>
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
                        <th>Pre??o</th>
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
                                <td>
                                    {
                                        v.photo &&
                                            <Button variant={'default'} onClick={e => showImageModalHandler(v.photo)}>
                                                <i className="fas fa-image text-primary"></i>
                                            </Button>
                                    }
                                    {
                                        !v.photo && ' - '
                                    }
                                </td>
                                <td>
                                    <Dropdown align={'end'}>
                                        <Dropdown.Toggle variant="success" className={'btn-menu btn-sm'} id="dropdown-basic">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={e => showUpdateModalHandler(v)}>
                                                <i className={'fas fa-edit text-primary'}></i>
                                                <span className={'ms-1'}>Editar</span>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={e => showDeleteModalHandler(v.id)}>
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
                <ModalShowVehicleImage show={showImageModal} setShow={setShowImageModal} image={imageModal} />
                <ModalDeleteVehicle id={idModal} setShow={setShowModalDelete} show={showModalDelete} />
                <ModalUpdateVehicle vehicle={vehicleModal} setShow={setShowModalUpdate} show={showModalUpdate} />
            </Container>
        </div>
    )
}