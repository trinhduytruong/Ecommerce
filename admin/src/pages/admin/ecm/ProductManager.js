import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Dropdown, Image, Nav, Pagination, Row, Table } from 'react-bootstrap';
import productService from '../../../api/productService';
import { Link, useSearchParams } from "react-router-dom";
import ProductModal from '../components/product/ProductModal';
import DeleteConfirmationModal from '../components/product/ProductDeleteConfirmationModal';
import apiUpload from "../../../api/apiUpload";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { createSlug } from "../../../helpers/formatters";
import { PaginationPage } from '../components/common/paginationPage';
import { buildFilter, onErrorImage } from '../../../helpers/commonfunc';
import { toast } from 'react-toastify';
import categoryService from '../../../api/categoryService';
import productLabelService from '../../../api/productLabelService';
import brandService from '../../../api/brandService';
import { ProductSearch } from '../components/product/ProductSearch';

const ProductManager = () =>
{
	const [ products, setProducts ] = useState( [] );
	const [ meta, setMeta ] = useState( { total: 0, total_page: 1, page: 1, page_size: 10 } );
	const [ editingProduct, setEditingProduct ] = useState( null );
	const [ showProductModal, setShowProductModal ] = useState( false );
	const [ showDeleteModal, setShowDeleteModal ] = useState( false );
	const [ productToDelete, setProductToDelete ] = useState( null );

	const [ content, setContent ] = useState( '' );
	const [ loading, setLoading ] = useState( false );
	const [ previewAlbumImages, setPreviewAlbumImages ] = useState( [] );
	const [ searchParams, setSearchParams ] = useSearchParams();
	const [ params, setParams ] = useState( {
		brand_id: null,
		name: null,
		category_id: null,
		status: null
	} );


	const [ categories, setCategories ] = useState( [] );
	const [ brands, setBrands ] = useState( [] );
	const [ productLabels, setProductLabels ] = useState( [] );

	const defaultImage = "https://via.placeholder.com/150";

	const fetchProducts = async ( params ) =>
	{
		try
		{
			params = {
				...params,
				category_id: Number( params.category_id || 0 ) || null,
				brand_id: Number( params.brand_id || 0 ) || null,
			}
			setParams( buildFilter(params) )
			const response = await productService.getLists( params );
			setProducts( response.data.data );
			setMeta( response.data.meta );
		} catch ( error )
		{
			console.error( "Error fetching products:", error );
		}
	};

	useEffect( () =>
	{
		const fetchData = async () =>
		{
			try
			{
				const [ categoriesRes, labelsRes, brandsRes ] = await Promise.all( [
					categoryService.getLists( { page: 1, page_size: 1000 } ),
					productLabelService.getLists( { page: 1, page_size: 1000 } ),
					brandService.getLists( { page: 1, page_size: 1000 } ),
				] );

				setCategories( categoriesRes.data.data );
				setBrands( brandsRes.data.data );
				setProductLabels( labelsRes.data.data?.map( label => ( {
					value: label.id,
					label: label.name
				} ) ) );
			} catch ( error )
			{
				console.error( "Error fetching data:", error );
			}
		};

		fetchData();
	}, [] );

	useEffect( () =>
	{
		const params = Object.fromEntries( [ ...searchParams ] );
		fetchProducts( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
	}, [ searchParams ] );

	const handleAddEditProduct = async ( values ) =>
	{
		const productData = {
			...values,
			price: Number( values.price, 10 ),
			categoryId: values.category,
			slug: createSlug( values.name )
		};
		try
		{

			// Upload từng ảnh trong mảng `values.album` và lấy link ảnh
			if ( values.albumImages && values.albumImages.length > 0 )
			{
				productData.images = await Promise.all(
					values.albumImages?.map( async ( file ) =>
					{
						const response = await apiUpload.uploadImage( file );
						return response.data; // Giả sử `response.data` chứa link ảnh sau khi upload
					} )
				);
			}
			if ( productData.old_images?.length )
			{
				productData.images = productData.old_images?.concat( productData.images )
			}


			console.info( "===========[] ===========[productData] : ", productData );
			let response = null;

			if ( editingProduct )
			{
				response = await productService.update( editingProduct.id, productData );
			} else
			{
				response = await productService.add( productData );
			}
			if ( response?.status == "success" )
			{
				toast.success( "Thao tác thành công" )
				setEditingProduct( null );
				setShowProductModal( false );
				const params = Object.fromEntries( [ ...searchParams ] );
				fetchProducts( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
			} else
			{
				console.log( "response error-------> ", response );
				toast.error( "Thao tác thất bại" );
			}
		} catch ( error )
		{
			console.error( "Error adding/updating product:", error );
		}
	};

	const handleDeleteProduct = async () =>
	{
		try
		{
			await productService.delete( productToDelete.id );
			const params = Object.fromEntries( [ ...searchParams ] );
			fetchProducts( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
			setShowDeleteModal( false );
		} catch ( error )
		{
			console.error( "Error deleting product:", error );
		}
	};
	const openProductModal = ( product = null ) =>
	{
		setEditingProduct( product );
		setShowProductModal( true );

		if ( product != null )
		{
			// Nếu sản phẩm có album, chuyển album thành mảng đối tượng xem trước
			if ( product.images )
			{
				setPreviewAlbumImages(
					product.images?.map( ( imageUrl ) => ( {
						url: imageUrl,
						old: true,
						file: null, // Để trống vì đây là ảnh đã tồn tại
					} ) )
				);
			} else
			{
				setPreviewAlbumImages( [] );
			}
		} else
		{
			setPreviewAlbumImages( [] );
		}
	};


	const handlePageChange = ( page ) =>
	{
		setSearchParams( { ...params, page } );
		fetchProducts( { ...params, page } );
	};

	const handlePageSizeChange = ( eventKey ) =>
	{
		const pageSize = Number( eventKey );
		setSearchParams( { ...Object.fromEntries( [ ...searchParams ] ), page_size: pageSize, page: 1 } );
		fetchProducts( { ...Object.fromEntries( [ ...searchParams ] ), page_size: pageSize, page: 1 } );
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
							<Nav.Link as={ Link } to="/admin/ecommerce/product">Sản phẩm</Nav.Link>
						</Nav.Item>
						<Breadcrumb.Item active>Index</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
			</Row>
			<Row className="gutters">
				<Col>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h2>Quản lý sản phẩm</h2>
						<Button size={ 'sm' } variant="primary" onClick={ () => openProductModal( null ) }>
							Thêm mới <FaPlusCircle className={ 'mx-1' } />
						</Button>
					</div>
					<ProductSearch
						categories={ categories }
						brands={ brands }
						productLabels={ productLabels }
						params={ params }
						setParams={ setParams }
						paging={ meta }
						getListData={ setSearchParams }
					>

					</ProductSearch>

					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Avatar</th>
								<th>Tên sản phẩm</th>
								<th>Danh mục</th>
								<th>Giá</th>
								<th>Số Lượng</th>
								<th>Nhãn</th>
								<th>Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{ products?.length > 0 ? products?.map( ( product, index ) => (
								<tr key={ product?.id }>
									<td>{ index + 1 }</td>
									<td>
										<Image src={ product?.avatar || defaultImage }
											onError={ onErrorImage }
											alt="Product avatar"
											rounded style={ { width: '50px', height: '50px', border: "1px solid gray" } } />
									</td>
									<td>{ product?.name } <br /><span>{ product?.slug }</span></td>
									<td>{ product?.category?.name }</td>
									<td>{ new Intl.NumberFormat( 'vi-VN', { style: 'currency', currency: 'VND' } ).format( product?.price ) }</td>
									<td>{ product?.number }</td>
									<td>
										{ product?.labels && product.labels.length > 0 ? (
											product.labels?.map( ( label ) => (
												<span key={ label.id } className="badge bg-secondary me-1">
													{ label.name }
												</span>
											) )
										) : (
											<span className="text-muted">Chưa có nhãn</span>
										) }
									</td>
									<td>
										<Button size="sm" variant="primary" onClick={ () => openProductModal( product ) } title="Cập nhật">
											<FaEdit />
										</Button>
										<Button size="sm" className={ 'ms-2' } variant="danger" onClick={ () => { setProductToDelete( product ); setShowDeleteModal( true ); } } title="Xoá">
											<FaTrash />
										</Button>
									</td>
								</tr>
							) ) : <tr>
								<td colSpan={ 8 } className='text-center'>Không có dữ liệu</td>
							</tr> }
						</tbody>
					</Table>

					<div className="d-flex justify-content-between align-items-center mt-4">
						<Dropdown onSelect={ handlePageSizeChange }>
							<Dropdown.Toggle variant="secondary" id="dropdown-basic">
								Hiển thị: { meta.page_size }
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item eventKey="10">10</Dropdown.Item>
								<Dropdown.Item eventKey="20">20</Dropdown.Item>
								<Dropdown.Item eventKey="50">50</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>

						{ meta?.total > 0 && <PaginationPage
							handlePageChange={ handlePageChange }
							meta={ meta }
						></PaginationPage> }
					</div>
				</Col>
			</Row>

			<ProductModal
				showProductModal={ showProductModal }
				setShowProductModal={ setShowProductModal }
				editingProduct={ editingProduct }
				categories={ categories }
				brands={ brands }
				productLabels={ productLabels }
				handleAddEditProduct={ handleAddEditProduct }
				loading={ loading }
				previewAlbumImages={ previewAlbumImages }
				setPreviewAlbumImages={ setPreviewAlbumImages }
			/>

			<DeleteConfirmationModal
				showDeleteModal={ showDeleteModal }
				setShowDeleteModal={ setShowDeleteModal }
				handleDeleteProduct={ handleDeleteProduct }
			/>
		</Container>
	);
};

export default ProductManager;
