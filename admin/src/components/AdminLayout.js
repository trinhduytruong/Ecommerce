import React, { startTransition, useEffect, useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './UserLayout.css';
import { logout } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaInternetExplorer } from "react-icons/fa";
import { UPLOAD_IMAGE } from '../helpers/constant';

const AdminLayout = ( { isAuthenticated, user, onLogout } ) =>
{

	const [ userData, setUserData ] = useState( user );
	const dataState = useSelector( ( state ) => state.user.user ) || user;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () =>
	{
		dispatch( logout() ); // Dispatch action logout để đăng xuất người dùng
		navigate( '/login' );
	};

	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand as={ Link } to="/admin">ADMIN</Navbar.Brand>
					<Nav className="me-auto">
						{ user?.user_type?.toUpperCase() == 'ADMIN' &&
							<>
								<Nav.Link as={ Link } to="/admin/user">Tài khoản</Nav.Link>
								<Dropdown as={ Nav.Item }>
									<Dropdown.Toggle as={ Nav.Link } id="dropdown-news">
										Tin tức
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item as={ Link } className='pb-2' to="/admin/news/menus">Chuyên mục</Dropdown.Item>
										<Dropdown.Item as={ Link } className='pb-2' to="/admin/news/tags">Từ khoá</Dropdown.Item>
										<Dropdown.Item as={ Link } className='pb-2' to="/admin/news/articles">Bài viết</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</> }
						<Dropdown as={ Nav.Item }>
							<Dropdown.Toggle as={ Nav.Link } id="dropdown-ecm">
								Bán hàng
							</Dropdown.Toggle>
							<Dropdown.Menu>
							{ user?.user_type?.toUpperCase() == 'ADMIN' && <>
								<Dropdown.Item className='pb-2' as={ Link } to="/admin/ecommerce/categories">Danh mục</Dropdown.Item>
								<Dropdown.Item as={ Link } className='pb-2' to="/admin/ecommerce/brands">Thương hiệu</Dropdown.Item>
								<Dropdown.Item as={ Link } className='pb-2' to="/admin/ecommerce/product-labels">Nhãn sản phẩm</Dropdown.Item>
								<Dropdown.Item as={ Link } className='pb-2' to="/admin/ecommerce/product">Sản phẩm</Dropdown.Item>
								<Dropdown.Item as={ Link } className='pb-2' to="/admin/ecommerce/vote">Đánh giá</Dropdown.Item>
								<Dropdown.Item as={ Link } className='pb-2' to="/admin/ecommerce/voucher">Voucher</Dropdown.Item>
							</>}
								<Dropdown.Item as={ Link } className='pb-2' to="/admin/ecommerce/order">Đơn hàng</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						{ user?.user_type?.toUpperCase() == 'ADMIN' && <Dropdown as={ Nav.Item }>
							<Dropdown.Toggle as={ Nav.Link } id="dropdown-ecm">
								Dữ liệu website
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item as={ Link } to="/admin/slides">Quản lý slide</Dropdown.Item>
								{/* <Dropdown.Item as={Link} to="/admin/setting/information">Thông tin website</Dropdown.Item> */ }
							</Dropdown.Menu>
						</Dropdown> }

						{/* <Nav.Link as={Link} to="/" className={'d-flex align-items-center'} target={'_blank'}>Vào website <FaInternetExplorer  className={'ms-2'}/></Nav.Link> */ }
					</Nav>
					<Nav>
						<Dropdown align="end">
							<Dropdown.Toggle as={ Nav.Link } id="dropdown-user">
								<img
									src={ dataState?.avatar || user?.name || UPLOAD_IMAGE }
									alt="Avatar"
									style={ { width: 30, height: 30, borderRadius: '50%', marginRight: 10 } }
								/>
								{ dataState?.name || user?.name }
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item as={ Link } to="/admin/profile">Cập nhật thông tin</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item
									onClick={ ( e ) =>
									{
										e.preventDefault();
										startTransition( () =>
										{
											navigate( "/login" );
										} );
									} }
								>Đăng xuất</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Nav>
				</Container>
			</Navbar>
			<Container style={ { minHeight: '70vh', paddingBottom: '100px' } }>
				<Outlet />
			</Container>
			<footer className="admin-footer text-center mt-4" style={ { zIndex: 1000 } }>
				<div className="footer-content">
					<p>&copy; { new Date().getFullYear() } Company Name. All rights reserved.</p>
					<div className="footer-links">
						<a href="/help">Help</a> |
						<a href="/privacy-policy">Privacy Policy</a> |
						<a href="/terms-of-service">Terms of Service</a>
					</div>
				</div>
			</footer>
			<ToastContainer position="top-right" autoClose={ 3000 } />
		</>
	);
};

export default AdminLayout;
