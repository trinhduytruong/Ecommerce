import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Pagination, Breadcrumb, Nav } from 'react-bootstrap';
import { Link, useSearchParams } from "react-router-dom";
import categoryService from '../../../api/categoryService';
import CategoryTable from '../components/category/CategoryTable';
import CategoryModal from '../components/category/CategoryModal';
import CategorySearchModal from '../components/category/CategorySearchModal';
import { FaPlusCircle } from "react-icons/fa";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import { createSlug } from "../../../helpers/formatters";
import { PaginationPage } from '../components/common/paginationPage';
import { toast } from 'react-toastify';
import { CommonSearch } from '../components/common/CommonSearch';
import { buildFilter } from '../../../helpers/commonfunc';
import { INIT_PAGING } from '../../../helpers/constant';
import voucherService from '../../../api/voucherService';
import VoucherModal from '../components/voucher/VoucherModal';
import VoucherConfirmationModal from '../components/voucher/VoucherDeleteConfirmationModal';
import VoucherTable from '../components/voucher/VoucherTable';

const VoucherManager = () =>
{
	const [ categories, setCategories ] = useState( [] );
	const [ meta, setMeta ] = useState( {...INIT_PAGING} );
	const [ editingCategory, setEditingCategory ] = useState( null );
	const [ showCategoryModal, setShowCategoryModal ] = useState( false );
	const [ showDeleteModal, setShowDeleteModal ] = useState( false );
	const [ categoryToDelete, setCategoryToDelete ] = useState( null );
	const [ loading, setLoading ] = useState( false );
	const [ showSearchModal, setShowSearchModal ] = useState( false );
	const [ searchParams, setSearchParams ] = useSearchParams();

	const [ searchCriteria, setSearchCriteria ] = useState( {
		name: searchParams.get( 'name' ) || '',
	} );

	const fetchCategoriesWithParams = async ( params ) =>
	{
		try
		{
			setSearchCriteria(buildFilter(params))
			const response = await voucherService.getLists( params );
			setCategories( response.data.data );
			setMeta( response.data.meta );
		} catch ( error )
		{
			console.error( "Error fetching categories:", error );
		}
	};

	useEffect( () =>
	{
		const params = Object.fromEntries( [ ...searchParams ] );
		fetchCategoriesWithParams( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
	}, [ searchParams ] );

	const handleSearch = ( value, key ) =>
	{
		setSearchCriteria( ( prev ) => ( { ...prev, [ key ]: value } ) );
	};

	const handleSearchSubmit = () =>
	{
		const newParams = { ...searchCriteria, page: 1 };
		setSearchParams( newParams );
		setShowSearchModal( false );
	};

	const handleResetSearch = () =>
	{
		setSearchCriteria( { name: '' } );
		setSearchParams( {} );
	};

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
			response = await voucherService.update( editingCategory.id, { ...editingCategory, ...values } );
		} else
		{
			response = await voucherService.add( values );
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
			const response = await voucherService.delete( categoryToDelete.id );
			if(response?.status == 'success') {
				toast.success( "Thao tác thành công" );
				setSearchParams({...searchCriteria, page:1});
			} else {
				toast.error( "Thao tác thất bại" )
			}

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
							<Nav.Link as={ Link } to="/">Home</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link as={ Link } to="/admin/ecommerce/voucher">Voucher</Nav.Link>
						</Nav.Item>
					</Breadcrumb>
				</Col>
			</Row>
			<Row className="gutters">
				<Col>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h2>Quản lý voucher</h2>
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
					<VoucherTable
						categories={ categories }
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

			<VoucherModal
				showCategoryModal={ showCategoryModal }
				setShowCategoryModal={ setShowCategoryModal }
				editingCategory={ editingCategory }
				handleAddEditCategory={ handleAddEditCategory }
				loading={ loading }
			/>

			<VoucherConfirmationModal
				showDeleteModal={ showDeleteModal }
				setShowDeleteModal={ setShowDeleteModal }
				handleDeleteData={ handleDeleteData }
			/>
		</Container>
	);
};

export default VoucherManager;
