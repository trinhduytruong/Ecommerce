import React from 'react';
import { Breadcrumb, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderBreadcrumbs = () => {
    return (
        <Breadcrumb>
            <Nav.Item>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/ecommerce/order">Đơn hàng</Nav.Link>
            </Nav.Item>
        </Breadcrumb>
    );
};

export default OrderBreadcrumbs;
