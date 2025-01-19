import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Pagination } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import serviceService from './../../api/serviceService';
import ServiceTable from './components/service/ServiceTable';
import ServiceFormModal from './components/service/ServiceFormModal';
import ServiceDeleteModal from './components/service/ServiceDeleteModal';
import ServiceSearchModal from './components/service/ServiceSearchModal';

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingService, setEditingService] = useState(null);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
    });

    const fetchServicesWithParams = async (params) => {
        try {
            const response = await serviceService.getLists(params);
            setServices(response.data.services);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchServicesWithParams({ ...params, page: params.page || 1 });
    }, [searchParams]);

    const handleSearch = (value, key) => {
        setSearchCriteria((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearchSubmit = () => {
        const newParams = { ...searchCriteria, page: 1 };
        setSearchParams(newParams);
        setShowSearchModal(false);
    };

    const handleResetSearch = () => {
        setSearchCriteria({ name: '' });
        setSearchParams({});
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchCriteria, page: newPage });
    };

    const handleAddEditService = async (values) => {
        const serviceData = {
            ...values,
            price: parseInt((values.price.toString()).replace(/\./g, ''), 10)
            // price: parseInt(values.price.replace(/\./g, ''), 10),
        };
        try {
            if (editingService) {
                const response = await serviceService.update(editingService._id, serviceData);
                setServices((prevServices) =>
                    prevServices?.map((service) =>
                        service._id === editingService._id ? response.data.service : service
                    )
                );
            } else {
                const response = await serviceService.add(serviceData);
                setServices((prevServices) => [...prevServices, response.data.service]);
            }
            setEditingService(null);
            setShowServiceModal(false);
        } catch (error) {
            console.error("Error adding/updating service:", error);
        }
    };

    const handleDeleteService = async () => {
        try {
            await serviceService.delete(serviceToDelete._id);
            setServices((prevServices) => prevServices?.filter((service) => service._id !== serviceToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const openServiceModal = (service = null) => {
        setEditingService(service);
        setShowServiceModal(true);
    };

    const formatCurrencyInput = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };


    return (
        <Container>
            <Row className="gutters mt-3">
                <Col xl={12}>
                    <Breadcrumb>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/services">Services</Nav.Link>
                        </Nav.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Manage Services</h2>
                        <div>
                            <Button variant="secondary" className="me-2" onClick={() => setShowSearchModal(true)}>
                                Search
                            </Button>
                            {user.role === 'admin' && (
                                <Button variant="primary" onClick={() => openServiceModal(null)}>
                                    Add New Service
                                </Button>
                            )}
                        </div>
                    </div>

                    <ServiceTable
                        services={services}
                        formatCurrency={formatCurrency}
                        openServiceModal={openServiceModal}
                        setServiceToDelete={setServiceToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                        user={user}
                    />

                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={meta.page === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(meta.page - 1)} disabled={meta.page === 1} />
                        {Array.from({ length: meta.total_page }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === meta.page}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(meta.page + 1)} disabled={meta.page === meta.total_page} />
                        <Pagination.Last onClick={() => handlePageChange(meta.total_page)} disabled={meta.page === meta.total_page} />
                    </Pagination>
                </Col>
            </Row>

            <ServiceFormModal
                showServiceModal={showServiceModal}
                setShowServiceModal={setShowServiceModal}
                editingService={editingService}
                handleAddEditService={handleAddEditService}
                formatCurrencyInput={formatCurrencyInput}
            />

            <ServiceDeleteModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteService={handleDeleteService}
            />

            <ServiceSearchModal
                showSearchModal={showSearchModal}
                setShowSearchModal={setShowSearchModal}
                searchCriteria={searchCriteria}
                handleSearch={handleSearch}
                handleResetSearch={handleResetSearch}
                handleSearchSubmit={handleSearchSubmit}
            />
        </Container>
    );
};

export default ServiceManager;
