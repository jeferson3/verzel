import {Button, Modal} from "react-bootstrap";
import "./style.css";
import React from "react";
import {useAdminContext} from "../../../../Context/Admin/context";
import {deletarVehicle} from "../../../../Context/Admin/actions";

type Props = {
    show: boolean,
    setShow: Function,
    id: number,
}

export const ModalDeleteVehicle: React.FC<Props> = ({id, show, setShow}) => {

    const { dispatch } = useAdminContext();
    const deletarHandler = () => {
        deletarVehicle(id, setShow, dispatch);
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Deletar veículo ?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Confirme a exclusão do registro:
                </p>
                <br />
                <div className={'d-flex justify-content-end'}>
                    <Button variant={'secondary'} onClick={e => setShow(false)}>
                        <i className={'fas fa-times'}></i>
                        <span className={'ms-1'}>Não</span>
                    </Button>
                    <Button variant={'primary'} className={'ms-2'} onClick={deletarHandler}>
                        <i className={'fas fa-check'}></i>
                        <span className={'ms-1'}>Sim</span>
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}