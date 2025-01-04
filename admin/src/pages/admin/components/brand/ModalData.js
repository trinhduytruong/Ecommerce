import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Form, Button, Spinner, Image } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaTimes, FaUpload } from "react-icons/fa";
import { toast } from 'react-toastify';
import { DEFAULT_IMG, STATUS_COMMON } from '../../../../helpers/constant';
import apiUpload from '../../../../api/apiUpload';
// import 

const ModalData = ( {
	showCategoryModal,
	setShowCategoryModal,
	editingCategory,
	handleAddEditCategory,
	// apiUpload // Thêm API upload ảnh
} ) =>
{
	const [ loading, setLoading ] = useState( false );
	const [ fileAvatar, setFileAvatar ] = useState( {
		file: null,
		url: null
	} );

	useEffect( () =>
	{
		if ( !showCategoryModal )
		{
			setFileAvatar( {
				file: null,
				url: null
			} )
		}
	}, [ showCategoryModal ] )

	useEffect( () =>
	{
		if ( editingCategory )
		{
			setFileAvatar( {
				file: null,
				url: editingCategory?.avatar
			} )
		}
	}, [ editingCategory ] )

	const handleSubmit = async ( values ) =>
	{
		console.log(loading);

		if ( loading )
		{
			return;
		}
		console.log(123);

		setLoading( true );
		if ( !fileAvatar.url )
		{
			toast.error( "Avatar không được để trống" );
			setLoading( false )
			return;
		}
		if ( fileAvatar.file )
		{
			const response = await apiUpload.uploadImage( fileAvatar.file );
			console.log( response, response?.data );
			if ( response?.status == 'success' )
			{
				values = { ...values, avatar: response?.data }
			} else
			{
				setLoading( false )
				toast.error( "Có lỗi xảy ra khi upload avatar" );
				return;
			}
		}
		setLoading( false )
		handleAddEditCategory( values );
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



	return (
		<Modal show={ showCategoryModal } onHide={ () => setShowCategoryModal( false ) }>
			<Modal.Header closeButton>
				<Modal.Title>{ editingCategory ? 'Cập nhật' : 'Thêm mới' }</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={ {
						name: editingCategory?.name || '',
						description: editingCategory?.description || '',
						status: editingCategory?.status || '',
					} }
					validationSchema={ Yup.object( {
						name: Yup.string().required( 'Tên thương hiệu không được để trống' ),
						description: Yup.string().required( 'Mô tả không được để trống' ),
						status: Yup.string().required( 'Trạng thái danh mục không được để trống' ),

					} ) }
					onSubmit={ ( values ) =>
					{
						handleSubmit( values );
					} }
				>
					{ ( { handleSubmit, setFieldValue } ) => (
						<Form onSubmit={ handleSubmit }>
							<Form.Group className={ 'mb-3 d-block' }>
								<Form.Label>Avatar</Form.Label>
								<div className='d-flex align-items-center justify-content-center'>
									<Image
										src={ fileAvatar.url || DEFAULT_IMG }
										alt={ fileAvatar.url || DEFAULT_IMG }
										width="90"
										onClick={ () => document.getElementById( 'album-upload' ).click() }
										height="90"
										roundedCircle
										style={ { border: "1px solid gray" } }
										className=""
									/>
									<Form.Control type="file"
										onChange={ handleAlbumImageChange }
										className="d-none" id="album-upload"
										accept="image/*" />
								</div>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Tên thương hiệu</Form.Label>
								<Field name="name" className="form-control" />
								<ErrorMessage name="name" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Trạng thái</Form.Label>
								<Field as="select" name="status" className="form-control">
									<option value="">Chọn trạng thái</option>
									{ STATUS_COMMON?.map( ( status, index ) => (
										<option key={ index } value={ status.value }>
											{ status.name }
										</option>
									) ) }
								</Field>
								<ErrorMessage name="status" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Mô tả</Form.Label>
								<Field name="description" className="form-control" as="textarea" rows={ 3 } />
								<ErrorMessage name="description" component="div" className="text-danger" />
							</Form.Group>



							<Button
								type="submit"
								className="d-flex justify-content-between align-items-center"
								size="sm"
								variant="primary"
								// disabled={ loading } // Disable nút khi đang tải ảnh
							>
								{ editingCategory ? 'Cập nhật' : 'Thêm mới' } <FaSave className="ms-2" />
							</Button>
						</Form>
					) }
				</Formik>
			</Modal.Body>
		</Modal>
	);
};

export default ModalData;
