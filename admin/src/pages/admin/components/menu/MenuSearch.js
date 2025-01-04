import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import { STATUS_COMMON } from '../../../../helpers/constant';
import { buildFilter } from '../../../../helpers/commonfunc';
const INIT_FORM = {
	name: null,
	status: null
}
export const MenuSearch = ( props ) =>
{
	const [ form, setForm ] = useState( { ...INIT_FORM } );

	useEffect( () =>
	{
		if ( props.params )
		{
			setForm( props.params )
		}
	}, [ props.params ] );

	const submit = ( e ) =>
	{
		e.preventDefault();
		props.getListData( buildFilter( { ...form, page: 1, page_size: props?.paging?.page_size } ) )

	};

	const reset = ( e ) =>
	{
		e.preventDefault();
		setForm( { ...INIT_FORM } )
		props.getListData( buildFilter( { ...INIT_FORM, page: 1, page_size: props?.paging?.page_size } ) )

	};


	return (
		<Form className='mb-3'>
			<Row className="h-100">
				<Col md={ 3 }>
					<Form.Group className="mb-3">
						<Form.Label>Tên</Form.Label>
						<Form.Control
							name="name"
							placeholder='Nhập giá trị'
							onChange={ ( e ) =>
							{
								setForm( { ...form, name: e?.target?.value } );
							} }
							value={ form.name || '' }
							className="form-control" />
					</Form.Group>
				</Col>
				<Col md={ 4 } className='d-flex align-items-center g-3'>
					<button type="button" className='btn btn-secondary' onClick={ reset }>
						Reset
					</button>
					<button type="submit" className='btn btn-primary mx-2' onClick={ submit }>
						Tìm kiếm
					</button>
				</Col>

			</Row>

		</Form>
	);
};

