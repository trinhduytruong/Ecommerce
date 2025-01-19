import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Pagination, Breadcrumb, Nav } from 'react-bootstrap';
import { Link, useSearchParams } from "react-router-dom";
import brandService from '../../../api/brandService';
import { FaPlusCircle } from "react-icons/fa";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import { createSlug } from "../../../helpers/formatters";
import ModalData from "../components/brand/ModalData";
import { PaginationPage } from '../components/common/paginationPage';

import BrandTable from "../components/brand/BrandTable";
import { toast } from 'react-toastify';
import { CommonSearch } from '../components/common/CommonSearch';
import { buildFilter } from '../../../helpers/commonfunc';

const BrandManager = () =>
{
	const [ brands, setBrands ] = useState( [] );
	const [ meta, setMeta ] = useState( { total: 0, total_page: 1, page: 1, page_size: 10 } );
	const [ editingCategory, setEditingCategory ] = useState( null );
	const [ showCategoryModal, setShowCategoryModal ] = useState( false );
	const [ showDeleteModal, setShowDeleteModal ] = useState( false );
	const [ categoryToDelete, setCategoryToDelete ] = useState( null );
	const [ loading, setLoading ] = useState( false );
	const [ searchParams, setSearchParams ] = useSearchParams();

	const [ searchCriteria, setSearchCriteria ] = useState( {
		name: searchParams.get( 'name' ) || '',
	} );

	const fetchCategoriesWithParams = async ( params ) =>
	{
		try
		{
			setSearchCriteria(buildFilter(params))
			const response = await brandService.getLists( params );
			setBrands( response.data.data );
			setMeta( response.data.meta );
		} catch ( error )
		{
			console.error( "Error fetching brands:", error );
		}
	};

	useEffect( () =>
	{
		const params = Object.fromEntries( [ ...searchParams ] );
		fetchCategoriesWithParams( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
	}, [ searchParams ] );


	const handlePageChange = ( newPage ) =>
	{
		setSearchParams( { ...searchCriteria, page: newPage } );
	};

	const handleAddEditCategory = async ( values ) =>
	{
		setLoading( true );
		values = {
			...values,
			slug: createSlug( values.name )
		}
		let response = null;

		if ( editingCategory )
		{
			response = await brandService.update( editingCategory.id, { ...editingCategory, ...values } );
		} else
		{
			response = await brandService.add( values );
		}
		setLoading( false )
		console.log( response );
		if ( response?.status == 'success' )
		{
			toast.success( "Thao tác thành công" )
			const params = Object.fromEntries( [ ...searchParams ] );
			setEditingCategory( null );
			setShowCategoryModal( false );
			fetchCategoriesWithParams( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
		} else
		{
			toast.error( "Thao tác thất bại" )
		}
	};

	const handleDeleteData = async () =>
	{
		try
		{
			await brandService.delete( categoryToDelete.id );

		} catch ( error )
		{
			console.error( "Error deleting category:", error );
		} finally
		{

		}
		const params = Object.fromEntries( [ ...searchParams ] );
		await fetchCategoriesWithParams( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
		setShowDeleteModal( false );
	};

	const openCategoryModal = ( category = null ) =>
	{
		setEditingCategory( category );
		setShowCategoryModal( true );
	};

	return (
		<Container>
			<Row className="gutters mt-3">
				<Col xl={ 12 }>
					<Breadcrumb>
						<Nav.Item>
							<Nav.Link as={ Link } to="/">Trang chủ</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={ Link } to="/admin/ecommerce/brands">Thương hiệu</Nav.Link>
						</Nav.Item>
					</Breadcrumb>
				</Col>
			</Row>
			<Row className="gutters">
				<Col>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h2>Quản lý thương hiệu</h2>
						<div>
							<Button size={ 'sm' } variant="primary" onClick={ () => openCategoryModal( null ) }>
								Thêm mới <FaPlusCircle className={ 'mx-1' } />
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
					<BrandTable
						brands={ brands }
						openCategoryModal={ openCategoryModal }
						setCategoryToDelete={ setCategoryToDelete }
						setShowDeleteModal={ setShowDeleteModal }
					/>
					{ meta?.total > 0 && <PaginationPage
						handlePageChange={ handlePageChange }
						meta={ meta }
					></PaginationPage> }
				</Col>
			</Row>

			<ModalData
				showCategoryModal={ showCategoryModal }
				setShowCategoryModal={ setShowCategoryModal }
				editingCategory={ editingCategory }
				handleAddEditCategory={ handleAddEditCategory }
				loading={ loading }
			/>

			<ModelConfirmDeleteData
				showDeleteModal={ showDeleteModal }
				setShowDeleteModal={ setShowDeleteModal }
				handleDeleteData={ handleDeleteData }
			/>
		</Container>
	);
};

export default BrandManager;
