import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaSave, FaTimes } from "react-icons/fa";

const TagFormModal = ({ showMenuModal, setShowMenuModal, editingMenu, handleAddEditMenu }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingMenu) {
            setFormValues({
                name: editingMenu.name,
                description: editingMenu.description,
            });
        } else {
            setFormValues({ name: '', description: '' });
        }
    }, [editingMenu]);

	useEffect(() => {
        if (!showMenuModal) {
            setFormValues({ name: '', description: '' });
            setErrors({});
        }
    }, [showMenuModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));

        // Xóa lỗi khi người dùng nhập lại giá trị
        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.name.trim()) {
            newErrors.name = 'Tên từ khoá là bắt buộc.';
        }
        if (!formValues.description.trim()) {
            newErrors.description = 'Mô tả là bắt buộc.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleAddEditMenu(formValues);
			
            setShowMenuModal(false);  // Đóng modal khi submit thành công
        }
    };

    return (
        <Modal show={showMenuModal} onHide={() => setShowMenuModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{editingMenu ? 'Cập nhật' : 'Thêm mới'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="menuName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            placeholder="Tên từ khoá"
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="menuDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Nhập mô tả"
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="d-flex justify-content-between align-items-center" size="sm" variant="danger" onClick={() => setShowMenuModal(false)}>
                    Huỷ bỏ <FaTimes />
                </Button>
                <Button className="d-flex justify-content-between align-items-center" size="sm" variant="primary" onClick={handleSubmit}>
                    {editingMenu ? 'Cập nhật' : 'Thêm mới'} <FaSave className="ms-2" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TagFormModal;
