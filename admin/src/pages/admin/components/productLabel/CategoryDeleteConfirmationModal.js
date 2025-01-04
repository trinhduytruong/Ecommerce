import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CategoryDeleteConfirmationModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteCategory }) => {
    return (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this category? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteCategory}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoryDeleteConfirmationModal;
