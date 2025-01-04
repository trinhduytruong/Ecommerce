import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';

import menuService from "../../../../api/menuService";
import tagService from "../../../../api/tagService";
import { FaSave } from "react-icons/fa"; // Import categoryService để gọi API
import { toast } from 'react-toastify';
import apiUpload from '../../../../api/apiUpload';
import { onErrorImage } from '../../../../helpers/commonfunc';

const statusConfig = [
	{
		id: "pending",
		name: "Pending"
	},
	{
		id: "published",
		name: "Published"
	},
]

const ArticleModal = ( {
	showProductModal,
	setShowProductModal,
	editingProduct,
	imageData,
	defaultImage,
	handleImageChange,
	content,
	setContent,
	handleAddEditProduct,
	loading,
	setLoading,
	selectedTags,
	setSelectedTags,
	menus, tags
} ) =>
{

	const [ fileAvatar, setFileAvatar ] = useState( {
		file: null,
		url: null
	} );

	useEffect( () =>
	{
		setFileAvatar( {
			file: null, url: editingProduct?.avatar
		} )

	}, [ editingProduct ] );

	useEffect( () =>
	{
		if ( !showProductModal )
		{
			setFileAvatar( {
				file: null,
				url: null
			} )
		}
	}, [ showProductModal ] )

	// const [selectedTags, setSelectedTags] = useState([]);
	const handleTagChange = ( selectedOptions ) =>
	{
		setSelectedTags( selectedOptions );
	};
	const handleAlbumImageChange = ( event ) =>
	{
		let file = event?.target?.files[ 0 ];

		const newPreviewUrls = {
			url: URL.createObjectURL( file ),
			file: file
		}

		setFileAvatar( newPreviewUrls );
	};
	const handleSubmit = async ( values ) =>
	{
		if ( loading )
		{
			return;
		}
		setLoading(true);
		if ( !fileAvatar.url )
		{
			setLoading(false);
			toast.error( "Avatar không được để trống" );
			return;
		}
		if ( fileAvatar.file )
		{
			const response = await apiUpload.uploadImage( fileAvatar.file );

			if ( response?.status == 'success' )
			{
				values = { ...values, avatar: response?.data }
			} else
			{
				setLoading(false);
				toast.error( "Có lỗi xảy ra khi upload avatar" );
				return;
			}
		}
		setLoading(false);
		handleAddEditProduct( values );
	};

	return (
		<Modal show={ showProductModal } onHide={ () => setShowProductModal( false ) } dialogClassName="modal-fullscreen">
			<Modal.Header closeButton>
				<Modal.Title>{ editingProduct ? 'Cập nhật bài viết' : 'Thêm mới bài viết' }</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="justify-content-center">
					<Col md={ 10 }>
						<Row>
							<Col md={ 4 }>
								<div className="mb-3">
									<Form.Label>Hình ảnh</Form.Label>
									<div className="product-image-preview mb-3">
										{ loading ? (
											<Spinner animation="border" />
										) : (
											<img
												src={ fileAvatar.url || defaultImage }
												alt="Article"
												onError={onErrorImage}
												className="img-fluid border-1"
												onClick={ () =>
												{
													document.getElementById( "article-avatar" )?.click();
												} }
												style={ {
													width: '100%',
													height: 'auto', border: "1px solid #d9d5d5",
													borderRadius: "10px",
													cursor: "pointer"
												} }
											/>
										) }
									</div>
									<Form.Control id='article-avatar' type="file" className='d-none' onChange={ handleAlbumImageChange } />
								</div>
							</Col>
							<Col md={ 8 }>
								<Formik
									initialValues={ {
										name: editingProduct?.name || '',
										description: editingProduct?.description || '',
										menuId: editingProduct?.menu_id || editingProduct?.menu?.id || '',
										is_featured: editingProduct?.is_featured || 1,
										views: editingProduct?.views || 0,
										content: editingProduct?.menu?.content || '',
										status: editingProduct?.status || 'pending',
									} }
									validationSchema={ Yup.object( {
										name: Yup.string().required( 'Tên bài viết không được để trống' ),
										description: Yup.string().required( 'Mô tả không được để trống' ),
										menuId: Yup.string().required( 'Chuyên mục không được để trống' ),
										// content: Yup.string().required('Required'),
										status: Yup.string().required( 'Trạng thái không được để trống' ),
									} ) }
									onSubmit={ handleSubmit }
								>
									{ ( { handleSubmit, setFieldValue, values, isSubmitting } ) =>
									{
										return (
											<Form onSubmit={ handleSubmit }>
												<Form.Group className="mb-3">
													<Form.Label>Tên bài viết</Form.Label>
													<Field name="name" className="form-control" />
													<ErrorMessage name="name" component="div" className="text-danger" />
												</Form.Group>

												<Form.Group className="mb-3">
													<Form.Label>Mô tả</Form.Label>
													<Field
														name="description"
														type="text"
														className="form-control"
													/>
													<ErrorMessage name="description" component="div" className="text-danger" />
												</Form.Group>

												<Form.Group className="mb-3">
													<Form.Label>Chuyên mục</Form.Label>
													<Field as="select" name="menuId" className="form-control">
														<option value="">Select a menu</option>
														{ menus?.map( ( menu ) => (
															<option key={ menu.id } value={ menu.id }>
																{ menu.name }
															</option>
														) ) }
													</Field>
													<ErrorMessage name="menu" component="div" className="text-danger" />
												</Form.Group>
												<Form.Group className="mb-3">
													<Form.Label>Từ khoá</Form.Label>
													<Select
														isMulti
														options={ tags }
														value={ selectedTags }
														onChange={ handleTagChange }
													/>
												</Form.Group>
												<Form.Group className="mb-3">
													<Form.Label>Trạng thái</Form.Label>
													<Field as="select" name="status" className="form-control">
														<option value="">Chọn trạng thái</option>
														{ statusConfig?.map( ( menu ) => (
															<option key={ menu.id } value={ menu.id }>
																{ menu.name }
															</option>
														) ) }
													</Field>
													<ErrorMessage name="status" component="div" className="text-danger" />
												</Form.Group>

												<Form.Group className="mb-3">
													<Form.Label>Nội dung</Form.Label>
													<ReactQuill
														value={ content }
														onChange={ setContent }
														theme="snow"
													/>
												</Form.Group>

												<Button className="d-flex justify-content-between align-items-center" type="submit" size={ 'sm' } variant="primary"
													disabled={ isSubmitting }>
													{ editingProduct ? 'Cập nhật' : 'Thêm mới' } <FaSave className="ms-2" />
												</Button>
											</Form>
										)
									} }
								</Formik>
							</Col>
						</Row>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
};

export default ArticleModal;
