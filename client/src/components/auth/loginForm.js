import { Form, Tab } from "react-bootstrap";
import React, { Fragment, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { API_SERVICE } from "../../helpers/apiHelper";
import { toggleShowLoading } from "../../redux/actions/common";

const FORM_LOGIN = {
	email: { value: "",name: "Email", rules: { required: true } },
	password: { value: "",name: "Mật khẩu", rules: { required: true, minLength: 6 } },
}


export const LoginForm = ( props ) =>
{
	const [ form, setForm ] = useState({...FORM_LOGIN});
	const dispatch = useDispatch();

	const submitForm = async ( e ) =>
	{
		dispatch( toggleShowLoading( true ) );
		const response = await API_SERVICE.post( 'auth/login' );
		dispatch( toggleShowLoading( false ) );

		if ( response?.status == 'success' )
		{
			localStorage.setItem( 'access_token', response?.data?.token_info?.access_token );
			localStorage.setItem( 'name', response?.data?.user?.name );
			localStorage.setItem( 'email', response?.data?.user?.email );
			localStorage.setItem( 'phone', response?.data?.user?.phone );
			localStorage.setItem( 'gender', response?.data?.user?.gender );
			localStorage.setItem( 'avatar', response?.data?.user?.avatar );
			localStorage.setItem( 'id', response?.data?.user?.id );
			window.location.href = '/';
		} else
		{
		}
		dispatch( toggleShowLoading( false ) );
	}

	return (
		<div className="login-form-container">
			<h2 className="text-center">Đăng nhập</h2>

			<div className="login-register-form">
				<Form
					className='p-3'
					name='nest-messages form'
				>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="name@example.com" />
					</Form.Group>
					<div className='mb-3'>
						<Form.Item name="username"
							rules={ [ { required: true } ] }
							className=' d-block'>
							<Input className='mb-0' placeholder='Nhập email' />
						</Form.Item>
					</div>
					<div className="mt-5 mb-3">
						<Form.Item name="password"
							rules={ [ { required: true } ] }
							className=' d-block '>
							<Input.Password type="password" className='mb-0' placeholder='Nhập mật khẩu' />
						</Form.Item>

					</div>

					<div className='button-box d-flex'>
						<button type="submit" className="w-100" style={ { padding: '15px 50px', fontSize: "16px", borderRadius: "10px" } }>
							Đăng nhập
						</button>
					</div>
				</Form>
				<div className="p-3 d-md-flex d-block justify-content-md-between">
					{/* <h4>
						<Link to={ "/reset-password/send-mail" } className="text-primary mt-2">
							Quên mật khẩu?
						</Link>
					</h4> */}
					<h4>
						<Link to={ "/login-register" } className="text-primary  mt-2">
							Tạo tài khoản
						</Link>
					</h4>
				</div>

			</div>

		</div>
	);
}