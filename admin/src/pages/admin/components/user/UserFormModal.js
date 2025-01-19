import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaTimes } from "react-icons/fa";
import Select from 'react-select';
import { DEFAULT_IMG, UPLOAD_IMAGE } from '../../../../helpers/constant';
import { toast } from 'react-toastify';

import apiUpload from '../../../../api/apiUpload';


const UserFormModal = ( {
	showUserModal, setShowUserModal,
	editingUser, handleAddEditUser
} ) =>
{
	const [ validationSchema, setValidationSchema ] = useState(
		Yup.object( {
			name: Yup.string().required( 'Họ tên không được để trống' ),
			status: Yup.string().required( 'Trạng thái không được để trống' ),
			email: Yup.string().email( 'Email không hợp lệ' ).required( 'Email không được để trống' ),
			phone: Yup.string()
				.required( 'Số điện thoại không được để trống' )
				.matches( /^\d{10,11}$/, 'Số điện thoại phải gồm 10-11 chữ số' ),
		} )
	);

	const [ fileAvatar, setFileAvatar ] = useState( {
		file: null,
		url: null
	} );

	const [ loading, setLoading ] = useState( false );

	useEffect( () =>
	{
		if ( !editingUser )
		{
			setValidationSchema(
				Yup.object( {
					name: Yup.string().required( 'Họ tên không được để trống' ),
					status: Yup.string().required( 'Trạng thái không được để trống' ),
					email: Yup.string().email( 'Email không hợp lệ' ).required( 'Email không được để trống' ),
					phone: Yup.string()
						.required( 'Số điện thoại không được để trống' )
						.matches( /^\d{10,11}$/, 'Số điện thoại phải gồm 10-11 chữ số' ),
					password: Yup.string().required( 'Mật khẩu không được để trống' ),
				} )
			);
		} else
		{
			setValidationSchema(
				Yup.object( {
					name: Yup.string().required( 'Họ tên không được để trống' ),
					status: Yup.string().required( 'Trạng thái không được để trống' ),
					email: Yup.string().email( 'Email không hợp lệ' ).required( 'Email không được để trống' ),
					phone: Yup.string()
						.required( 'Số điện thoại không được để trống' )
						.matches( /^\d{10,11}$/, 'Số điện thoại phải gồm 10-11 chữ số' ),
				} )
			);
			setFileAvatar( {
				file: null, url: editingUser?.avatar
			} )
		}
	}, [ editingUser ] );

	useEffect( () =>
	{
		if ( !showUserModal )
		{
			setFileAvatar( {
				file: null,
				url: null
			} )
		}
	}, [ showUserModal ] )

	const initialValues = {
		name: editingUser?.name || '',
		email: editingUser?.email || '',
		phone: editingUser?.phone || '',
		user_type: editingUser?.user_type || 'USER',
		status: editingUser?.status?.toString() || "1",
		password: '',
	};


	const handleSubmit = async ( values ) =>
	{
		if ( loading )
		{
			return;
		}
		if ( !fileAvatar.url )
		{
			toast.error( "Avatar không được để trống" );
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
				toast.error( "Có lỗi xảy ra khi upload avatar" );
				return;
			}
		}
		values = {...values, status: Number(values?.status)}
		handleAddEditUser( values );
	};

	const userTypeOptions = [
		{ value: 'USER', label: 'USER' },
		{ value: 'ADMIN', label: 'ADMIN' },
		{ value: 'SHIPPER', label: 'SHIPPER' },
	];

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
		<Modal show={ showUserModal } onHide={ () => setShowUserModal( false ) }>
			<Modal.Header closeButton>
				<Modal.Title>{ editingUser ? 'Cập nhật' : 'Thêm mới' }</Modal.Title>
			</Modal.Header>
			<Formik
				initialValues={ initialValues }
				validationSchema={ validationSchema }
				onSubmit={ handleSubmit }
				enableReinitialize
			>
				{ ( { handleSubmit, isSubmitting, setFieldValue, values } ) => (
					<Form onSubmit={ handleSubmit }>
						<Modal.Body>
							<Form.Group className={ 'mb-3 d-block' }>
								<Form.Label>Avatar</Form.Label>
								<div style={{cursor: "pointer"}} className='d-flex align-items-center justify-content-center'>
									<Image
										src={ fileAvatar.url || UPLOAD_IMAGE }
										alt={ fileAvatar.url || UPLOAD_IMAGE }
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

							<Form.Group className={ 'mb-3' }>
								<Form.Label>Họ tên</Form.Label>
								<Field name="name" type="text" className="form-control" />
								<ErrorMessage name="name" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className={ 'mb-3' }>
								<Form.Label>Email</Form.Label>
								<Field name="email" type="email" className="form-control" />
								<ErrorMessage name="email" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className={ 'mb-3' }>
								<Form.Label>Số điện thoại</Form.Label>
								<Field name="phone" type="text" className="form-control" />
								<ErrorMessage name="phone" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className={ 'mb-3' }>
								<Form.Label>Trạng thái</Form.Label>
								<Field as="select" name="status"
									className="form-control">
									<option value="">Chọn giá trị</option>
									<option value="1">Hoạt động</option>
									<option value="-1">Không hoạt động</option>
								</Field>
								<ErrorMessage name="status" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className={ 'mb-3' }>
								<Form.Label>Loại người dùng</Form.Label>
								<Select
									options={ userTypeOptions }
									value={ userTypeOptions.find( option => option.value === values.user_type ) }
									onChange={ ( selectedOption ) => setFieldValue( 'user_type', selectedOption.value ) }
									className="basic-single"
									classNamePrefix="select"
								/>
								<ErrorMessage name="user_type" component="div" className="text-danger" />
							</Form.Group>

							{ !editingUser && (
								<Form.Group className={ 'mb-3' }>
									<Form.Label>Mật khẩu</Form.Label>
									<Field name="password" type="password" className="form-control" />
									<ErrorMessage name="password" component="div" className="text-danger" />
								</Form.Group>
							) }
						</Modal.Body>
						<Modal.Footer>
							<Button
								className={ 'd-flex justify-content-between align-items-center' }
								size={ 'sm' }
								variant="danger"
								onClick={ () => setShowUserModal( false ) }
							>
								Huỷ bỏ <FaTimes className={ 'ms-2' } />
							</Button>
							<Button
								className={ 'd-flex justify-content-between align-items-center' }
								size={ 'sm' }
								type="submit"
								variant="primary"
								disabled={ isSubmitting }
							>
								{ editingUser ? 'Cập nhật' : 'Thêm mới' } <FaSave className={ 'ms-2' } />
							</Button>
						</Modal.Footer>
					</Form>
				) }
			</Formik>
		</Modal>
	);
};

export default UserFormModal;
