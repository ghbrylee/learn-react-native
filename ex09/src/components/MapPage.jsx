import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Map,MapMarker} from 'react-kakao-maps-sdk'
const MapPage = ({locals}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" className='btn-sm'
                onClick={handleShow}>
                위치
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{locals.place_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Map center={{ lat: locals.y, lng: locals.x }} style={{ width: "100%", height: "360px" }}>
                        <MapMarker position={{ lat: locals.y, lng: locals.x }}>
                            <div style={{ color: "#000" }}>{locals.address_name}</div>
                        </MapMarker>
                    </Map>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫음
                    </Button>
                    <Button variant="primary">허락</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MapPage