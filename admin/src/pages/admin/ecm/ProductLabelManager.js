import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Pagination, Breadcrumb, Nav} from 'react-bootstrap';
import {Link, useSearchParams} from "react-router-dom";
import categoryService from '../../../api/categoryService';
import CategoryModal from '../components/category/CategoryModal';
import CategorySearchModal from '../components/category/CategorySearchModal';
import productLabelService from "../../../api/productLabelService";
import ProductLabelTable from "../components/productLabel/ProductLabelTable";
import {FaPlusCircle} from "react-icons/fa";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import moment from 'moment';
import {createSlug} from "../../../helpers/formatters";
import { toast } from 'react-toastify';
import { PaginationPage } from '../components/common/paginationPage';
import { CommonSearch } from '../components/common/CommonSearch';
import { buildFilter } from '../../../helpers/commonfunc';


const ProductLabelManager = () => {
    const [productLabels, setProductLabel] = useState([]);
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
			setSearchCriteria(buildFilter(params))
            const response = await productLabelService.getLists(params);
            setProductLabel(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Error fetching productLabels:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchCategoriesWithParams({ ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 });
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

    const handleAddEditCategory = async (values) => {

		setLoading( true );
		values = {
			...values,
			slug: createSlug( values.name )
		}
		let response = null;

		if ( editingCategory )
		{
			response = await productLabelService.update( editingCategory.id, { ...editingCategory, ...values } );
		} else
		{
			response = await productLabelService.add( values );
		}
		setLoading( false )
		if ( response?.status == 'success' )
		{
			toast.success( "Thao tác thành công" )
			const params = Object.fromEntries([...searchParams]);
            fetchCategoriesWithParams({ ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 });
            setEditingCategory(null);
            setShowCategoryModal(false);
		} else
		{
			toast.error( "Thao tác thất bại" )
		}
        setLoading(true);
       
    };

    const handleDeleteData = async () => {
        setLoading(true);
        try {
            await productLabelService.delete(categoryToDelete.id);
            const params = Object.fromEntries([...searchParams]);
            fetchCategoriesWithParams({ ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 });

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
                            <Nav.Link as={Link} to="/admin/ecommerce/product-labels">Product Label</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Nhãn sản phẩm</h2>
                        <div>
                            <Button size={'sm'} variant="primary" onClick={() => openCategoryModal(null)}>
                                Thêm mới <FaPlusCircle className={'mx-1'} />
                            </Button>
                        </div>
                    </div>
					<CommonSearch
						params={ searchCriteria }
						// menus={menus}
						setParams={ setSearchCriteria }
						paging={ meta }
						getListData={ setSearchParams }
					/>
                    <ProductLabelTable
                        productLabels={productLabels}
                        openCategoryModal={openCategoryModal}
                        setCategoryToDelete={setCategoryToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />
                    { meta?.total > 0 && <PaginationPage
						handlePageChange={ handlePageChange }
						meta={ meta }
					></PaginationPage> }
                </Col>
            </Row>

            <CategoryModal
                showCategoryModal={showCategoryModal}
                setShowCategoryModal={setShowCategoryModal}
                editingCategory={editingCategory}
                handleAddEditCategory={handleAddEditCategory}
                loading={loading}
            />

            {/*<CategoryDeleteConfirmationModal*/}
            {/*    showDeleteModal={showDeleteModal}*/}
            {/*    setShowDeleteModal={setShowDeleteModal}*/}
            {/*    handleDeleteCategory={handleDeleteCategory}*/}
            {/*    loading={loading}*/}
            {/*/>*/}

            <ModelConfirmDeleteData
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteData={handleDeleteData}
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

export default ProductLabelManager;
