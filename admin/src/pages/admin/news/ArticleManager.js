import React, { useState, useEffect } from 'react';
import
{
	Container,
	Row,
	Col,
	Button,
	Table,
	Pagination,
	Breadcrumb,
	Nav,
	Image,
	ButtonGroup,
	Dropdown, Badge
} from 'react-bootstrap';

import { Link, useSearchParams } from "react-router-dom";
import apiUpload from "../../../api/apiUpload";
import ArticleModal from "../components/article/ArticleModal";
import articleService from "../../../api/articleService";
import { FaEdit, FaListUl, FaPlusCircle, FaTrash } from "react-icons/fa";
import moment from "moment";
import StatusLabel from "../../../helpers/StatusLabel";
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import { createSlug, formatTime } from "../../../helpers/formatters";
import { PaginationPage } from '../components/common/paginationPage';
import { INIT_PAGING } from '../../../helpers/constant';
import { toast } from 'react-toastify';
import tagService from '../../../api/tagService';
import menuService from '../../../api/menuService';
import { CommonSearch } from '../components/common/CommonSearch';
import { buildFilter } from '../../../helpers/commonfunc';

const ArticleManager = () =>
{
	const [ articles, setArticles ] = useState( [] );
	const [ meta, setMeta ] = useState( { ...INIT_PAGING } );
	const [ selectedTags, setSelectedTags ] = useState( [] );
	const [ tags, setTags ] = useState( [] );
	const [ menus, setMenus ] = useState( [] );
	const [ editingProduct, setEditingProduct ] = useState( null );
	const [ showProductModal, setShowProductModal ] = useState( false );
	const [ showDeleteModal, setShowDeleteModal ] = useState( false );
	const [ productToDelete, setProductToDelete ] = useState( null );
	const [ imageData, setImageData ] = useState( null );
	const [ contentArticle, setContent ] = useState( '' );
	const [ discriptionArticle, setDiscriptionArticle ] = useState( '' );
	const [ loading, setLoading ] = useState( false );
	const defaultImage = "https://via.placeholder.com/150";
	const [ searchParams, setSearchParams ] = useSearchParams();
	const [ searchCriteria, setSearchCriteria ] = useState( {
		name: searchParams.get( 'name' ) || null,
	} );

	const fetchArticles = async ( params ) =>
	{
		try
		{
			setSearchCriteria(buildFilter(params))
			const response = await articleService.getLists( params );
			setArticles( response.data.data );
			setMeta( response.data.meta );
		} catch ( error )
		{
			console.error( "Error fetching products:", error );
		}
	};

	useEffect(() => {
		getListDataRelations()
	}, [])

	const getListDataRelations = async () => {
		const [ tagsResponse, menusResponse ] = await Promise.all( [
			tagService.getLists( { page: 1, page_size: 1000 } ),
			menuService.getLists( { page: 1, page_size: 1000 } ),
		] );

		const tagData = tagsResponse?.data?.data?.map(item => ({
			value:item.id,
			label:item.name
		}))
		const menuData = tagsResponse?.data?.data?.map(item => ({
			value:item.id,
			label:item.name,
			...item
		}))

		setTags( tagData || [] );
		setMenus( menuData || [] );

	}


	useEffect( () =>
	{
		const params = Object.fromEntries( [ ...searchParams ] );
		fetchArticles( {
			...params,
			page: params.page
				|| meta?.page || 1,
			page_size: params.page_size
				|| meta?.page_size || 10
		} ).then( r => { } );
	}, [ searchParams ] );



	const handleAddEditProduct = async ( values ) =>
	{
		console.log('Submitted values to API:', values);
		const tagIds = selectedTags?.map( tag => tag?.value );
		const dataModel = {
			...values,
			avatar: values?.avatar || editingProduct?.avatar || defaultImage,
			content: values?.content,
			tags: tagIds,
			slug: createSlug( values.name )
		};

		setLoading( true );
		let response = null;

		if ( editingProduct )
		{
			response = await articleService.update( editingProduct.id, dataModel );

		} else
		{
			response = await articleService.add( dataModel );
		}
		setLoading( false )
		if ( response?.status == 'success' )
		{
			console.log('API saved content successfully:', response?.data);
			toast.success( "Thao tác thành công" );
			setEditingProduct( null );
			setShowProductModal( false );
			const params = Object.fromEntries( [ ...searchParams ] );
			fetchArticles( {
				...params,
				page: params.page
					|| meta?.page || 1,
				page_size: params.page_size
					|| meta?.page_size || 10
			} );
		} else
		{
			toast.error( response?.message || "Thao tác thất bại" );

		}
	};

	const handleDeleteData = async () =>
	{
		try
		{
			await articleService.delete( productToDelete.id );
			setArticles( ( prevProducts ) => prevProducts?.filter( ( product ) => product.id !== productToDelete.id ) );
			setShowDeleteModal( false );
		} catch ( error )
		{
			console.error( "Error deleting product:", error );
		}
	};

	const openProductModal = ( dataEdit = null ) =>
	{
		setEditingProduct( dataEdit );
		setContent(dataEdit);
		setShowProductModal( true );
		if ( dataEdit && dataEdit.avatar ) setImageData( dataEdit.avatar );
		if ( dataEdit && dataEdit.content ) setContent( dataEdit.content );


		if ( dataEdit && dataEdit.tags )
		{
			// Đặt selectedTags khi mở modal trong chế độ chỉnh sửa
			setSelectedTags( dataEdit.tags?.map( tag => ( { value: tag.id, label: tag.name } ) ) );
		} else
		{
			setSelectedTags( [] );
		}
	};

	const handleResetSearch = () =>
	{
		setSearchCriteria( {} );
		setSearchParams( { page: 1} );
	};

	const handlePageChange = ( newPage ) =>
	{
		console.info( "===========[] =========== : " );
		setSearchParams( { ...searchCriteria, page: newPage } );
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
							<Nav.Link as={ Link } to="/admin/news/articles">Bài viết</Nav.Link>
						</Nav.Item>
						<Breadcrumb.Item active>Index</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
			</Row>
			<Row className="gutters">
				<Col>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h2>Quản lý bài viết</h2>
						<div>
							<Button size={ 'sm' } variant="primary" onClick={ () => openProductModal( null ) }>
								Thêm mới <FaPlusCircle className={ 'mx-1' } />
							</Button>
						</div>
					</div>
					<CommonSearch
						params={ searchCriteria }
						menus={menus}
						setParams={ setSearchCriteria }
						paging={ meta }
						getListData={ setSearchParams }
					/>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th className={ 'text-center' }>#</th>
								<th className='text-nowrap text-center' style={ { width: "100px" } }>Hình ảnh</th>
								<th style={ { width: "30%" } }>Tên bài viết</th>
								<th>Chuyên mục</th>
								<th>Từ khoá</th>
								<th>Trạng thái</th>
								<th>Ngày tạo</th>
								<th>Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{ articles?.map( ( article, index ) => (
								<tr key={ article.id }>
									<td className={ 'text-center' } >{ index + 1 }</td>
									<td className='text-center'>
										<Image src={ article.avatar || "https://via.placeholder.com/150" } alt="Promotion"
											rounded style={ { width: '50px', height: '50px' } } />
									</td>
									<td>{ article.name }</td>
									<td>{ article.menu?.name }</td>
									<td>
										{ article.tags?.map( tag => (
											<Badge key={ tag.id } bg="secondary" className="me-1">
												{ tag.name }
											</Badge>
										) ) }
									</td>
									<td>
										<StatusLabel status={ article.status } />
									</td>
									<td>{ formatTime(article.created_at, 'DD-MM-YYYY') }</td>
									<td>
										<Button size="sm" variant="primary" onClick={ () => openProductModal( article ) }
											title="Cập nhật">
											<FaEdit />
										</Button>
										<Button size="sm" className={ 'ms-2' } variant="danger" onClick={ () =>
										{
											setProductToDelete( article );
											setShowDeleteModal( true );
										} } title="Xoá">
											<FaTrash />
										</Button>
									</td>
								</tr>
							) ) }
						</tbody>
					</Table>
					{ meta?.total > 0 && <PaginationPage
						handlePageChange={ handlePageChange }
						meta={ meta }
					></PaginationPage> }
				</Col>
			</Row>

			<ArticleModal
				showProductModal={ showProductModal }
				setShowProductModal={ setShowProductModal }
				editingProduct={ editingProduct }
				imageData={ imageData }
				setLoading={ setLoading }
				defaultImage={ defaultImage }
				content={ contentArticle }
				setContent={ setContent }
				discription = { discriptionArticle}
				setDiscription = { setDiscriptionArticle}
				handleAddEditProduct={ handleAddEditProduct }
				loading={ loading }
				tags={tags}
				menus={menus}
				selectedTags={ selectedTags }
				setSelectedTags={ setSelectedTags }
			/>

			<ModelConfirmDeleteData
				showDeleteModal={ showDeleteModal }
				setShowDeleteModal={ setShowDeleteModal }
				handleDeleteData={ handleDeleteData }
			/>
		</Container>
	);
};

export default ArticleManager;
