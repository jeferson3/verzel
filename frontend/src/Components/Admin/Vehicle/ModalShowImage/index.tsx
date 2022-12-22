import {Modal} from "react-bootstrap";
import "./style.css";
import React from "react";
import {BASE_URL} from "../../../../Environment";

type Props = {
    show: boolean,
    setShow: Function,
    image: string,
}

export const ModalShowVehicleImage: React.FC<Props> = ({image, show, setShow}) => {

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Imagem veículo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={'text-center'}>
                    <img alt={'imagem do veículo'} width={300} src={BASE_URL + '/storage/' + image} />
                </div>
            </Modal.Body>
        </Modal>
    );
}