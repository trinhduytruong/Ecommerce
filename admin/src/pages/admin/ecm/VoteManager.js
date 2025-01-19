import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Pagination, Breadcrumb, Nav} from 'react-bootstrap';
import {Link, useSearchParams} from "react-router-dom";
import apiVoteService from '../../../api/apiVoteService';
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import {createSlug} from "../../../helpers/formatters";
import VoteTable from "../components/vote/VoteTable";
import { buildFilter } from '../../../helpers/commonfunc';
import { VoteSearch } from '../components/vote/VoteSearch';

const CategoryManager = () => {
    const [votes, setVotes] = useState([]);
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

    const fetchDataWithParams = async (params) => {
        try {
			setSearchCriteria(buildFilter(params));
            const response = await apiVoteService.getListsAdmin(params);
			if(response?.status == 'success') {
				let data = response?.data?.data?.map(item => {
					item.product_name = item?.product_name || item?.product?.name;
					item.user_name = item?.user_name || item?.user?.name;
					return item;
				})
				setVotes(response.data.data);
				setMeta(response.data.meta);
			}

        } catch (error) {
            console.error("Error fetching votes:", error);
        }
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchDataWithParams({ ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 });
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        setSearchParams({ ...searchCriteria, page: newPage });
    };


    const handleDeleteData = async () => {
        try {
            await apiVoteService.delete(categoryToDelete.id);

        } catch (error) {
            console.error("Error deleting category:", error);
        } finally {

        }
        const params = Object.fromEntries([...searchParams]);
        await fetchDataWithParams({...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10});
        setShowDeleteModal(false);
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
                            <Nav.Link as={Link} to="/admin/ecommerce/vote">Đánh giá</Nav.Link>
                        </Nav.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="gutters">
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Quản lý đánh giá</h2>
                    </div>
					<VoteSearch
					paging={meta}
					getListData={setSearchParams}
					params={searchCriteria}
					/>
                    <VoteTable
                        votes={votes}
                        openCategoryModal={openCategoryModal}
                        setCategoryToDelete={setCategoryToDelete}
                        setShowDeleteModal={setShowDeleteModal}
                    />
                    {meta && meta.total > 0 && (
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
                    )}
                </Col>
            </Row>

            <ModelConfirmDeleteData
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteData={handleDeleteData}
            />
        </Container>
    );
};

export default CategoryManager;
