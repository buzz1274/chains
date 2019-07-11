import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from "prop-types";


export default class CustomModal extends React.Component {
    static propTypes = {
        modalOptions: PropTypes.object.isRequired,
        updateState: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
    }

    setTitle() {
        if(this.props.modalOptions.type == 'delete_chain') {
            return 'Delete Chain';
        }
    }

    setBody() {
        if(this.props.modalOptions.type == 'delete_chain') {
            return 'delete herp derp';
        }
    }

    closeModal() {
        this.props.updateState({modalOptions: {}});
    }

    doAction() {
        this.closeModal();
        this.props.modalOptions.action();
    }

    setButtonTitle() {
        if(this.props.modalOptions.type == 'delete_chain') {
            return 'Delete';
        }
    }

    render() {
        return (
                <Modal
                    show={ Boolean(this.props.modalOptions.type) }
                    onHide={() => { this.closeModal(); }}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            { this.setTitle() }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            { this.setBody() }
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className='btn btn-light'
                                onClick = {() => {
                                    this.closeModal();
                                }} >
                            Cancel
                        </button>
                        <button type='button' className='btn btn-primary'
                                onClick = {() => {
                                    this.doAction();
                                }} >
                            { this.setButtonTitle() }
                        </button>
                    </Modal.Footer>
                </Modal>
        );
    }
}