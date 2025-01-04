import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TagSearchModal = ({ showSearchModal, setShowSearchModal, searchCriteria, handleSearch, handleResetSearch, handleSearchSubmit }) => {
    return (
        <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Search Menus</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="searchName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={searchCriteria.name}
                            onChange={(e) => handleSearch(e.target.value, 'name')}
                            placeholder="Enter menu name"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowSearchModal(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSearchSubmit}>
                    Search
                </Button>
                <Button variant="outline-secondary" onClick={handleResetSearch}>
                    Reset
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TagSearchModal;
