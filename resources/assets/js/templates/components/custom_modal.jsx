import React from 'react';
import { Modal, Alert } from 'react-bootstrap';
import PropTypes from "prop-types";
import '../../../css/components/custom_modal.css';


export default class CustomModal extends React.Component {
    static propTypes = {
        modalOptions: PropTypes.object.isRequired,
        updateState: PropTypes.func.isRequired
    }

    static titleText = {
        delete_chain: 'Delete Chain'
    }

    static bodyText = {
        delete_chain: 'Warning!!!! This action is permanent and cannot be reversed',
        delete_chain_success: 'Chain successfully deleted',
        delete_chain_failure: 'An error occurred deleting the chain',
        outstanding_chain_confirmed_success: 'Outstanding chain successfully confirmed',
        outstanding_chain_confirmed_failure: 'An error occurred when confirming outstanding chain'
    }

    static buttonText = {
        delete_chain: 'Delete'
    }

    constructor(props) {
        super(props);
    }

    confirmationModal() {
        return (
            <Modal className="modal_custom"
                show={Boolean(this.props.modalOptions.modal_type)}
                onHide={() => {
                    this.closeModal();
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        { CustomModal.titleText[this.props.modalOptions.modal_type] }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        { CustomModal.bodyText[this.props.modalOptions.modal_type] }
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button type='button' className='btn btn-light'
                            onClick={() => {
                                this.closeModal();
                            }}>
                        Cancel
                    </button>
                    <button type='button' className='btn btn-primary'
                            onClick={() => {
                                this.doAction();
                            }}>
                        {this.props.modalOptions.modal_type in CustomModal.buttonText ? (
                                CustomModal.buttonText[this.props.modalOptions.modal_type]
                            ) : (
                                "Save"
                            )
                        }
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }

    alertModal(variant) {
        return (
            <Modal className="modal_custom"
                show={ Boolean(this.props.modalOptions.modal_type) }
                onHide={() => { this.closeModal(); }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Alert className="alert_custom" variant={ variant } >
                    { CustomModal.bodyText[this.props.modalOptions.modal_type] }
                </Alert>
            </Modal>
        )
    }

    closeModal() {
        this.props.updateState({modalOptions: {}});
    }

    doAction() {
        this.closeModal();
        this.props.modalOptions.modal_action();
    }

    render() {
        let modal;

        if(this.props.modalOptions.modal_class) {
            if (this.props.modalOptions.modal_class.match(/alert/g)) {
                let variant = this.props.modalOptions.modal_class.split('_');
                modal = this.alertModal(variant[1]);
            } else if (this.props.modalOptions.modal_class == 'confirmation') {
                modal = this.confirmationModal();
            }
        }

        return (
            <React.Fragment>
                {modal}
            </React.Fragment>
        );
    }
}