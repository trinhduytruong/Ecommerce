import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Form, Spinner, Button, Card } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import { FaSave, FaTrash, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import categoryService from './../../../../api/categoryService';
import productLabelService from '../../../../api/productLabelService';
import brandService from '../../../../api/brandService';
import { formatCurrencyInput } from '../../../../helpers/formatters';
import apiUpload from "../../../../api/apiUpload";
import { DEFAULT_IMAGE, DEFAULT_IMG } from '../../../../helpers/constant';
import { onErrorImage } from '../../../../helpers/commonfunc';
import { toast } from 'react-toastify';

const ProductModal = ( {
	showProductModal,
	setShowProductModal,
	editingProduct,
	handleAddEditProduct,
	loading,
	previewAlbumImages,
	setPreviewAlbumImages,
	categories,
	brands,
	productLabels,
} ) =>
{
	const [ content, setContent ] = useState( editingProduct?.contents || '' );
	const [ albumImages, setAlbumImages ] = useState( [] );
	const [ productImage, setProductImage ] = useState( null );

	useEffect( () =>
	{
		if ( editingProduct )
		{
			setContent( editingProduct?.contents );
			setProductImage( editingProduct?.avatar );
		}

	}, [ editingProduct ] )

	const handleMainImageChange = async ( event ) =>
	{
		if ( event.target.files && event.target.files[ 0 ] )
		{
			// setProductImage(event.target.files[0]);
			try
			{
				const response = await apiUpload.uploadImage( event.target.files[ 0 ] );
				// setProductImage(response.data);
			} catch ( error )
			{
				console.error( "Error uploading image:", error );
			} finally
			{
				// setLoading(false);
			}
		}
	};

	const handleAlbumImageChange = ( event ) =>
	{
		const files = Array.from( event.target.files );
		setAlbumImages( prevImages => [ ...prevImages, ...files ] );

		const newPreviewUrls = files?.map( file => ( {
			url: URL.createObjectURL( file ),
			file: file
		} ) );

		setPreviewAlbumImages( prevPreviews => [ ...prevPreviews, ...newPreviewUrls ] );
	};

	const removeAlbumImage = ( index ) =>
	{
		setAlbumImages( prevImages => prevImages.filter( ( _, i ) => i !== index ) );
		setPreviewAlbumImages( prevPreviews =>
		{
			URL.revokeObjectURL( prevPreviews[ index ].url );
			return prevPreviews.filter( ( _, i ) => i !== index );
		} );
	};

	const handleImageChange = async ( e ) =>
	{
		const file = e.target.files[ 0 ];
		if ( file )
		{
			const response = await apiUpload.uploadImage( file );
			if ( response?.status == 'success' )
			{
				setProductImage( response.data );
			} else
			{
				toast.error("Có lỗi xảy ra khi upload ảnh")
			}
		}
	};

	useEffect( () =>
	{
		return () =>
		{
			previewAlbumImages.forEach( preview => URL.revokeObjectURL( preview.url ) );
		};
	}, [] );

	useEffect( () =>
	{
		if ( !showProductModal )
		{
			setAlbumImages( [] );
			setContent( null );
			setProductImage( null );
			setPreviewAlbumImages( [] );
		}
	}, [ showProductModal ] );


	return (
		<Modal show={ showProductModal } onHide={ () => setShowProductModal( false ) } size="xl" className="product-modal">
			<Modal.Header closeButton>
				<Modal.Title>{ editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }</Modal.Title>
			</Modal.Header>
			<Modal.Body className="p-0">
				<Formik
					initialValues={ {
						name: editingProduct?.name || '',
						price: editingProduct?.price || '',
						category: editingProduct?.category?.id || '',
						brand: editingProduct?.brand?.id || '',
						status: editingProduct?.status || 'pending',
						number: editingProduct?.number || '',
						sale: editingProduct?.sale || 0,
						description: editingProduct?.description || "",
						productsLabels: editingProduct?.labels?.map( label => label.id ) || [],
					} }
					validationSchema={ Yup.object( {
						name: Yup.string().required( 'Tên sản phẩm không được để trống' ),
						description: Yup.string().required( 'Mô tả sản phẩm không được để trống' ),
						price: Yup.number().required( 'Giá sản phẩm không được để trống' )
							.positive( 'Giá phải là số dương' ),
						category: Yup.string().required( 'Danh mục không được để trống' ),
						brand: Yup.string().required( 'Thương hiệu không được để trống' ),
					} ) }
					onSubmit={ ( values ) =>
					{
						let images = previewAlbumImages?.filter( ( item ) => item?.old )?.map( ( item ) => item.url )
						handleAddEditProduct( { ...values, avatar:productImage,  contents: content, albumImages, old_images: images || [] } );
					} }
				>
					{ ( { handleSubmit, setFieldValue, values, isSubmitting } ) => (
						<Form onSubmit={ handleSubmit }>
							<Row className="h-100 g-0">
								<Col md={ 4 } className="border-end">
									<div className="p-3 h-100 d-flex flex-column">
										<Form.Group className="mb-3 flex-grow-0">
											<Form.Label>Ảnh chính sản phẩm</Form.Label>
											<div className="main-image-preview mb-2">
												<img
													src={ productImage ? productImage : DEFAULT_IMAGE }
													alt="Main Product"
													onError={ onErrorImage }
													onClick={ () =>
													{
														document.getElementById( "product-main-avatar" )?.click()
													} }

													className="img-fluid"
													style={ {
														width: '100%', height: 'auto', minHeight: "150px",
														maxHeight: '200px', objectFit: 'cover', border: "1px solid gray", borderRadius: "10px"
													} }
												/>
											</div>
											<Form.Control id="product-main-avatar" type="file" onChange={ handleImageChange } />
										</Form.Group>

										<Form.Group className="mb-3 flex-grow-1">
											<Form.Label>Album ảnh sản phẩm</Form.Label>
											<div className="album-images-container" style={ { overflowY: 'auto', maxHeight: 'calc(100vh - 400px)' } }>
												<Row className="g-2">
													{ previewAlbumImages?.map( ( preview, index ) => (
														<Col key={ index } xs={ 6 }>
															<Card className="h-100 position-relative">
																<Card.Img
																	variant="top"
																	src={ preview.url }
																	className='mb-3'
																	alt={ `Product ${ index + 1 }` }
																	style={ { height: '100px', objectFit: 'cover' } }
																/>
																<Button
																	variant="danger"
																	size="sm"
																	className="position-absolute top-0 end-0 m-1 rounded-circle p-1"
																	onClick={ () => removeAlbumImage( index ) }
																	style={ { width: '20px', height: '20px' } }
																>
																	<MdClose size={ 12 } />
																</Button>
															</Card>
														</Col>
													) ) }
													<Col xs={ 6 }>
														<Card
															className="h-100 d-flex justify-content-center align-items-center"
															style={ { minHeight: '100px', cursor: 'pointer' } }
															onClick={ () => document.getElementById( 'album-upload' ).click() }
														>
															<div className="text-center p-2 mb-3">
																<FaPlus size={ 20 } className="mb-1" />
																<div style={ { fontSize: '0.8rem' } }>Thêm ảnh</div>
															</div>
														</Card>
														<Form.Control
															id="album-upload"
															type="file"
															multiple
															onChange={ handleAlbumImageChange }
															style={ { display: 'none' } }
															accept="image/*"
														/>
													</Col>
												</Row>
											</div>
										</Form.Group>
									</div>
								</Col>
								<Col md={ 8 }>
									<div className="p-3" style={ { height: '80vh', overflowY: 'auto' } }>
										<Form.Group className="mb-3">
											<Form.Label>Tên sản phẩm</Form.Label>
											<Field name="name" className="form-control" />
											<ErrorMessage name="name" component="div" className="text-danger" />
										</Form.Group>

										<Row>
											<Col md={ 6 }>
												<Form.Group className="mb-3">
													<Form.Label>Giá</Form.Label>
													<Field
														name="price"
														type="text"
														className="form-control"
														value={ formatCurrencyInput( values.price.toString() ) }
														onChange={ ( e ) =>
														{
															const rawValue = e.target.value.replace( /\./g, "" );
															setFieldValue( "price", rawValue );
														} }
													/>
													<ErrorMessage name="price" component="div" className="text-danger" />
												</Form.Group>
											</Col>
											<Col md={ 6 }>
												<Form.Group className="mb-3">
													<Form.Label>Số lượng</Form.Label>
													<Field
														name="number"
														type="number"
														className="form-control"
													/>
													<ErrorMessage name="number" component="div" className="text-danger" />
												</Form.Group>
											</Col>
										</Row>

										<Row>
											<Col md={ 6 }>
												<Form.Group className="mb-3">
													<Form.Label>Danh mục</Form.Label>
													<Field as="select" name="category" className="form-control">
														<option value="">Chọn danh mục</option>
														{ categories?.map( ( category ) => (
															<option key={ category.id } value={ category.id }>
																{ category.name }
															</option>
														) ) }
													</Field>
													<ErrorMessage name="category" component="div" className="text-danger" />
												</Form.Group>
											</Col>
											<Col md={ 6 }>
												<Form.Group className="mb-3">
													<Form.Label>Trạng thái</Form.Label>
													<Field as="select" name="status" className="form-control">
														<option value="pending">Chờ duyệt</option>
														<option value="published">Hoạt động</option>
														<option value="draft">Không hoạt động</option>
													</Field>
												</Form.Group>
											</Col>
										</Row>

										<Row>
											<Col md={ 6 }>
												<Form.Group className="mb-3">
													<Form.Label>Nhãn sản phẩm</Form.Label>
													<Select
														isMulti
														options={ productLabels }
														value={ productLabels?.filter( label => values.productsLabels.includes( label.value ) ) }
														onChange={ ( selectedOptions ) =>
														{
															const selectedValues = selectedOptions ? selectedOptions?.map( option => option.value ) : [];
															setFieldValue( "productsLabels", selectedValues );
														} }
													/>
												</Form.Group>
											</Col>
											<Col md={ 6 }>
												<Form.Group className="mb-3">
													<Form.Label>Thương hiệu</Form.Label>
													<Field as="select" name="brand" className="form-control">
														<option value="">Chọn thương hiệu</option>
														{ brands?.map( ( brand ) => (
															<option key={ brand.id } value={ brand.id }>
																{ brand.name }
															</option>
														) ) }
													</Field>
													<ErrorMessage name="brand" component="div" className="text-danger" />
												</Form.Group>
											</Col>
										</Row>
										<Form.Group className="mb-3">
											<Form.Label>Mô tả</Form.Label>
											<Field as="textarea" rows={ 3 }
												name="description" className="form-control">
											</Field>
											<ErrorMessage name="description" component="div" className="text-danger" />
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Chi tiết</Form.Label>
											<ReactQuill
												value={ content }
												onChange={ setContent }
												theme="snow"
											/>
										</Form.Group>

										<div className="d-flex justify-content-end mt-3">
											<Button
												className="d-flex align-items-center"
												type="submit"
												variant="primary"
												disabled={ isSubmitting || loading }
											>
												{ loading ? (
													<Spinner size="sm" className="me-2" />
												) : (
													<FaSave className="me-2" />
												) }
												{ editingProduct ? 'Cập nhật' : 'Thêm mới' }
											</Button>
										</div>
									</div>
								</Col>
							</Row>
						</Form>
					) }
				</Formik>
			</Modal.Body>
		</Modal>
	);
};

export default ProductModal;
