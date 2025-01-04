import React from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaTimes } from "react-icons/fa";
import { STATUS_COMMON } from '../../../../helpers/constant';
import { formatCurrencyInput } from '../../../../helpers/formatters';

const VoucherModal = ( {
	showCategoryModal,
	setShowCategoryModal,
	editingCategory,
	loading,
	handleAddEditCategory
} ) =>
{

	return (
		<Modal show={ showCategoryModal } onHide={ () => setShowCategoryModal( false ) }>
			<Modal.Header closeButton>
				<Modal.Title>{ editingCategory ? 'Thêm mới' : 'Cập nhật' }</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={ {
						name: editingCategory?.name || '',
						status: editingCategory?.status || 'pending',
						price: editingCategory?.price || '',
						description: editingCategory?.description || '',
					} }
					validationSchema={ Yup.object( {
						name: Yup.string().required( 'Tên voucher không được để trống' ),
						price: Yup.number().required( 'Giá trị voucher không được để trống' )
							.positive( 'Giá phải là số dương' ),
						status: Yup.string().required( 'Trạng thái voucher không được để trống' ),
						description: Yup.string().required( 'Mô tả không được để trống' ),
					} ) }
					onSubmit={ handleAddEditCategory }
				>
					{ ( { handleSubmit, setFieldValue, values } ) => (
						<Form onSubmit={ handleSubmit }>
							<Form.Group className="mb-3">
								<Form.Label>Tên voucher</Form.Label>
								<Field name="name" className="form-control" />
								<ErrorMessage name="name" component="div" className="text-danger" />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Giá</Form.Label>
								<Field
									name="price"
									type="text"
									className="form-control"
									value={ formatCurrencyInput( values?.price.toString() ) }
									onChange={ ( e ) =>
									{
										const rawValue = e.target.value.replace( /\./g, "" );
										setFieldValue( "price", rawValue );
									} }
								/>
								<ErrorMessage name="price" component="div" className="text-danger" />
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

							<Button type="submit" className="d-flex justify-content-between align-items-center" size="sm" variant="primary">
								{ editingCategory ? 'Cập nhật' : 'Thêm mới' } <FaSave className="ms-2" />
							</Button>
						</Form>
					) }
				</Formik>
			</Modal.Body>
		</Modal>
	);
};

export default VoucherModal;
