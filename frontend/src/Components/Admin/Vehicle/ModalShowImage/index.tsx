import {Modal} from "react-bootstrap";
import "./style.css";
import React, {useEffect, useState} from "react";
import {BASE_URL} from "../../../../Environment";

type Props = {
    show: boolean,
    setShow: Function,
    image: string,
}

export const ModalShowVehicleImage: React.FC<Props> = ({image, show, setShow}) => {

    const [base64, setBase64] = useState("");

    // useEffect(function () {
    //     getBase64Image(BASE_URL + '/storage/' + image);
    // })

    const getBase64Image = (url: string) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                setBase64(reader?.result?.toString() ?? '');

            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

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