import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Table, Pagination, Breadcrumb, Nav, Image} from 'react-bootstrap';
import productService from './../../api/productService';
import { Link } from "react-router-dom";
import ProductModal from './components/product/ProductModal';
import DeleteConfirmationModal from './components/product/ProductDeleteConfirmationModal';
import apiUpload from "../../api/apiUpload";

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const defaultImage = "https://via.placeholder.com/150";
    const fetchProducts = async () => {
        try {
            const response = await productService.getLists({});
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddEditProduct = async (values) => {
        const productData = {
            ...values,
            price: parseInt(values.price, 10),
            avatar: productImage || defaultImage,
            content: description,
        };
        try {
            if (editingProduct) {
                const response = await productService.update(editingProduct._id, productData);
                setProducts((prevProducts) =>
                    prevProducts?.map((product) =>
                        product._id === editingProduct._id ? response.data.product : product
                    )
                );
            } else {
                const response = await productService.add(productData);
                setProducts((prevProducts) => [...prevProducts, response.data.product]);
            }
            setEditingProduct(null);
            setShowProductModal(false);
        } catch (error) {
            console.error("Error adding/updating product:", error);
        }
    };


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const response = await apiUpload.uploadImage(file);
                setProductImage(response.data.fileUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteProduct = async () => {
        try {
            await productService.delete(productToDelete._id);
            setProducts((prevProducts) => prevProducts?.filter((product) => product._id !== productToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const openProductModal = (product = null) => {
        setEditingProduct(product);
        setShowProductModal(true);
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
                            <Nav.Link as={Link} to="/admin/products">Products</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Manage Products</h2>
                        <div>
                            <Button variant="primary" onClick={() => openProductModal(null)}>
                                Add New Product
                            </Button>
                        </div>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products?.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Image src={product.avatar || "https://via.placeholder.com/150"} alt="Promotion" rounded style={{width: '50px', height: '50px'}} />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category?.name}</td>
                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                                <td>
                                    <Button variant="warning" onClick={() => openProductModal(product)} className="me-2">
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => { setProductToDelete(product); setShowDeleteModal(true); }}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/*<ProductModal*/}
            {/*    showProductModal={showProductModal}*/}
            {/*    setShowProductModal={setShowProductModal}*/}
            {/*    editingProduct={editingProduct}*/}
            {/*    handleAddEditProduct={handleAddEditProduct}*/}
            {/*/>*/}

            <ProductModal
                showProductModal={showProductModal}
                setShowProductModal={setShowProductModal}
                editingProduct={editingProduct}
                productImage={productImage}
                defaultImage={defaultImage}
                handleImageChange={handleImageChange}
                description={description}
                setDescription={setDescription}
                handleAddEditProduct={handleAddEditProduct}
                loading={loading}
            />

            <DeleteConfirmationModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteProduct={handleDeleteProduct}
            />
        </Container>
    );
};

export default ProductManager;
