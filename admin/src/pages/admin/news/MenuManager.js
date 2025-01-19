import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Nav, Pagination } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import menuService from '../../../api/menuService';
import MenuTable from '../components/menu/MenuTable';
import MenuFormModal from '../components/menu/MenuFormModal';
import MenuDeleteModal from '../components/menu/MenuDeleteModal';
import MenuSearchModal from '../components/menu/MenuSearchModal';
import { FaPlusCircle } from "react-icons/fa";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import { createSlug } from "../../../helpers/formatters";
import { INIT_PAGING } from '../../../helpers/constant';
import { MenuSearch } from '../components/menu/MenuSearch';
import { buildFilter } from '../../../helpers/commonfunc';
import { PaginationPage } from '../components/common/paginationPage';
import { toast } from 'react-toastify';

const MenuManager = () =>
{
	const [ menus, setMenus ] = useState( [] );
	const [ meta, setMeta ] = useState( { ...INIT_PAGING } );
	const [ editingMenu, setEditingMenu ] = useState( null );
	const [ showMenuModal, setShowMenuModal ] = useState( false );
	const [ showDeleteModal, setShowDeleteModal ] = useState( false );
	const [ menuToDelete, setMenuToDelete ] = useState( null );
	const [ showSearchModal, setShowSearchModal ] = useState( false );

	const [ searchParams, setSearchParams ] = useSearchParams();
	const navigate = useNavigate();

	const [ searchCriteria, setSearchCriteria ] = useState( {
		name: searchParams.get( 'name' ) || '',
	} );

	const fetchMenusWithParams = async ( params ) =>
	{
		try
		{
			setSearchCriteria( buildFilter( params ) )
			const response = await menuService.getLists( params );
			setMenus( response.data.data );
			setMeta( response.data.meta );
		} catch ( error )
		{
			console.error( "Error fetching menus:", error );
		}
	};

	useEffect( () =>
	{
		const params = Object.fromEntries( [ ...searchParams ] );
		fetchMenusWithParams( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
	}, [ searchParams ] );

	const handleSearch = ( value, key ) =>
	{
		setSearchCriteria( ( prev ) => ( { ...prev, [ key ]: value } ) );
	};

	const handleSearchSubmit = () =>
	{
		const newParams = { ...searchCriteria, page: 1, page_size: 10 };
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

	const handleAddEditMenu = async ( values ) =>
	{

		const dataModel = {
			...values,
			slug: createSlug( values.name )
		};
		try
		{
			let response;
			if ( editingMenu )
			{
				response = await menuService.update( editingMenu.id, dataModel );
			} else
			{
				response = await menuService.add( dataModel );
			}
			if ( response?.status == 'success' )
			{
				toast.success( "Thao tác thành công" );
				const params = Object.fromEntries( [ ...searchParams ] );
				fetchMenusWithParams( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
				setEditingMenu( null );
				setShowMenuModal( false );
			} else {
				toast.error(response?.message ||  "Thao tác thất bại" );
			}

		} catch ( error )
		{
			toast.error("Thao tác thất bại" );
			console.error( "Error adding/updating menu:", error );
		}
	};

	const handleDeleteData = async () =>
	{
		try
		{
			const response = await menuService.delete( menuToDelete.id );
			if(response?.status == 'success') {
				toast.success( "Thao tác thành công" );
				setShowDeleteModal( false );
				const params = Object.fromEntries( [ ...searchParams ] );
				fetchMenusWithParams( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
			} else {
				toast.error( response?.message || "Thao tác thất bại" );
			}
		} catch ( error )
		{
			toast.error( error?.response?.data?.message || "Thao tác thất bại" );

			console.error( "Error deleting menu:", error );
		}
	};

	const openMenuModal = ( menu = null ) =>
	{
		setEditingMenu( menu );
		setShowMenuModal( true );
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
							<Nav.Link as={ Link } to="/admin/menus">Chuyên mục</Nav.Link>
						</Nav.Item>
					</Breadcrumb>
				</Col>
			</Row>
			<Row className="gutters">
				<Col>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h2>Quản lý chuyên mục</h2>
						<div>
							<Button size={ 'sm' } variant="primary" onClick={ () => openMenuModal( null ) }>
								Thêm mới <FaPlusCircle className={ 'mx-1' } />
							</Button>
						</div>
					</div>
					<MenuSearch
						params={ searchCriteria }
						setParams={ setSearchCriteria }
						paging={ meta }
						getListData={ setSearchParams }
					>

					</MenuSearch>
					<MenuTable
						menus={ menus }
						openMenuModal={ openMenuModal }
						setMenuToDelete={ setMenuToDelete }
						setShowDeleteModal={ setShowDeleteModal }
					/>

					{ meta?.total > 0 && <PaginationPage
						handlePageChange={ handlePageChange }
						meta={ meta }
					></PaginationPage> }
				</Col>
			</Row>

			<MenuFormModal
				showMenuModal={ showMenuModal }
				setShowMenuModal={ setShowMenuModal }
				editingMenu={ editingMenu }
				handleAddEditMenu={ handleAddEditMenu }
			/>

			<ModelConfirmDeleteData
				showDeleteModal={ showDeleteModal }
				setShowDeleteModal={ setShowDeleteModal }
				handleDeleteData={ handleDeleteData }
			/>

			<MenuSearchModal
				showSearchModal={ showSearchModal }
				setShowSearchModal={ setShowSearchModal }
				searchCriteria={ searchCriteria }
				handleSearch={ handleSearch }
				handleResetSearch={ handleResetSearch }
				handleSearchSubmit={ handleSearchSubmit }
			/>
		</Container>
	);
};

export default MenuManager;
