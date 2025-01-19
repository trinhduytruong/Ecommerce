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
				<Route path="/" element={ <Navigate to="/admin" replace /> } />

				<Route path="/admin/*" element={ <AdminRoutes /> } />

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
