import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import './App.css';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import { useDispatch } from "react-redux";
import { loadUserFromLocalStorage } from "./redux/slices/authSlice";

// Import các route đã tách
import AdminRoutes from './routes/AdminRoutes';
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";


const AuthLayout = React.lazy( () => import( './components/AuthLayout' ) );


const App = () =>
{
	const dispatch = useDispatch();

	useEffect( () =>
	{
		dispatch( loadUserFromLocalStorage() ); // Load user and token from localStorage when the app starts
	}, [ dispatch ] );

	return (
		<Router>
			<Routes>
				{/* Routes dành cho guest, có thể truy cập bởi cả guest và người dùng đã đăng nhập */ }
				{/* <Route path="/*" element={<GuestLayout />}>
                    <Route index element={
                        <Suspense fallback={<div>Loading Home...</div>}>
                            <Home />
                        </Suspense>
                    } />
                    <Route path="product" element={
                        <Suspense fallback={<div>Loading Products...</div>}>
                            <Product />
                        </Suspense>
                    } />
                    <Route path="p/:slug" element={
                        <Suspense fallback={<div>Loading Product Details...</div>}>
                            <ProductDetail />
                        </Suspense>
                    } />
                    <Route path="cart" element={
                        <Suspense fallback={<div>Loading Cart...</div>}>
                            <Cart />
                        </Suspense>
                    } />
                    <Route path="c/:slug" element={
                        <Suspense fallback={<div>Loading Category...</div>}>
                            <Category />
                        </Suspense>
                    } />
                </Route> */}

				<Route path="/" element={ <Navigate to="/admin" replace /> } />

				{/* Sử dụng AdminRoutes */ }
				<Route path="/admin/*" element={ <AdminRoutes /> } />

				{/* Sử dụng UserRoutes */ }
				{/* <Route path="/user/*" element={<UserRoutes />} /> */ }

				{/* Routes dành cho login và register */ }
				<Route path="login" element={ <AuthLayout /> }>
					<Route index element={ <Login /> } />
				</Route>
				<Route path="register" element={ <AuthLayout /> }>
					<Route index element={ <Register /> } />
				</Route>
				<Route path="forgot-password" element={ <AuthLayout /> }>
					<Route index element={ <ForgotPassword /> } />
				</Route>
				<Route path="/reset-password/:token" element={ <AuthLayout /> }>
					<Route index element={ <ResetPassword /> } />
				</Route>

				{/* Điều hướng đến trang chủ nếu không tìm thấy route */ }
				<Route path="*" element={ <Navigate to="/" /> } />
			</Routes>
		</Router>
	);
};

export default App;
