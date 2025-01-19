import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Pagination, Breadcrumb, Nav} from 'react-bootstrap';
import {Link, useSearchParams} from "react-router-dom";
import categoryService from './../../api/categoryService';
import CategoryTable from './components/category/CategoryTable';
import CategoryModal from './components/category/CategoryModal';
import CategoryDeleteConfirmationModal from './components/category/CategoryDeleteConfirmationModal';
import CategorySearchModal from './components/category/CategorySearchModal';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [meta, setMeta] = useState({ total: 0, total_page: 1, page: 1, page_size: 10 });
    const [editingCategory, setEditingCategory] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchCriteria, setSearchCriteria] = useState({
        name: searchParams.get('name') || '',
    });

    const fetchCategoriesWithParams = async (params) => {
        try {
            const response = await categoryService.getLists(params);
            setCategories(response.data.categories);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchCategoriesWithParams({ ...params, page: params.page || 1 });
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
        fetchCategoriesWithParams({name: null, page: 1, page_size: 10})
    };

    const handlePageChange = (newPage) => {
        fetchCategoriesWithParams({ ...searchCriteria, page: newPage });
    };

    const handleAddEditCategory = async (values) => {
        setLoading(true);
        try {
            if (editingCategory) {
                const response = await categoryService.update(editingCategory._id, values);
                setCategories((prevCategories) =>
                    prevCategories?.map((category) =>
                        category._id === editingCategory._id ? response.data.category : category
                    )
                );
            } else {
                const response = await categoryService.add(values);
                setCategories((prevCategories) => [...prevCategories, response.data.category]);
            }
            setEditingCategory(null);
            setShowCategoryModal(false);
        } catch (error) {
            console.error("Error adding/updating category:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCategory = async () => {
        setLoading(true);
        try {
            await categoryService.delete(categoryToDelete._id);
            setCategories((prevCategories) => prevCategories?.filter((category) => category._id !== categoryToDelete._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting category:", error);
        } finally {
            setLoading(false);
        }
    };

    const openCategoryModal = (category = null) => {
        setEditingCategory(category);
        setShowCategoryModal(true);
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
                            <Nav.Link as={Link} to="/admin/categories">Categories</Nav.Link>
                        </Nav.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Manage Categories</h2>
                        <div>
                            <Button variant="primary" onClick={() => openCategoryModal(null)}>
                                Add New Category
                            </Button>
                        </div>
                    </div>
                    <CategoryTable
                        categories={categories}
                        openCategoryModal={openCategoryModal}
                        setCategoryToDelete={setCategoryToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={meta.page === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(meta.page - 1)}
                            disabled={meta.page === 1}
                        />
                        {Array.from({ length: meta.total_page }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === meta.page}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(meta.page + 1)}
                            disabled={meta.page === meta.total_page}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(meta.total_page)}
                            disabled={meta.page === meta.total_page}
                        />
                    </Pagination>
                </Col>
            </Row>

            <CategoryModal
                showCategoryModal={showCategoryModal}
                setShowCategoryModal={setShowCategoryModal}
                editingCategory={editingCategory}
                handleAddEditCategory={handleAddEditCategory}
                loading={loading}
            />

            <CategoryDeleteConfirmationModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteCategory={handleDeleteCategory}
                loading={loading}
            />

            <CategorySearchModal
                showSearchModal={showSearchModal}
                setShowSearchModal={setShowSearchModal}
                searchCriteria={searchCriteria}
                handleSearch={handleSearch}
                handleSearchSubmit={handleSearchSubmit}
                handleResetSearch={handleResetSearch}
            />
        </Container>
    );
};

export default CategoryManager;
