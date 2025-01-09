import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// home pages
const HomePage = lazy( () => import( "./pages/home/HomePage" ) );
const MyOrder = lazy( () => import( "./pages/other/MyOrder" ) );

// shop pages
const ShopPage = lazy( () => import( "./pages/shop/ShopGridStandard" ) );

// product pages
const Product = lazy( () => import( "./pages/shop-product/Product" ) );

// blog pages
const BlogStandard = lazy( () => import( "./pages/blog/BlogPage" ) );
const BlogStandardMenu = lazy( () => import( "./pages/blog/BlogStandardMenu" ) );
const BlogTag = lazy( () => import( "./pages/blog/BlogTag" ) );
const BlogDetailsStandard = lazy( () =>
	import( "./pages/blog/BlogDetailsStandard" )
);

// other pages
const Contact = lazy( () => import( "./pages/other/Contact" ) );
const MyAccount = lazy( () => import( "./pages/other/MyAccount" ) );
const ResetPassword = lazy( () => import( "./pages/auth/ResetPassword" ) );
const ForgotPassword = lazy( () => import( "./pages/auth/ForgotPassword" ) );
const LoginRegister = lazy( () => import( "./pages/auth/LoginRegister" ) );
const Login = lazy( () => import( "./pages/auth/LoginPage" ) );
const Register = lazy( () => import( "./pages/auth/RegisterPage" ) );

const Cart = lazy( () => import( "./pages/other/Cart" ) );
const Wishlist = lazy( () => import( "./pages/other/Wishlist" ) );

const NotFound = lazy( () => import( "./pages/other/NotFound" ) );
const PaymentStatus = lazy( () => import( "./pages/other/PaymentStatus" ) );

const App = ( props ) =>
{
	useEffect( () =>
	{
		props.dispatch(
			loadLanguages( {
				languages: {
					en: require( "./translations/english.json" ),
					fn: require( "./translations/french.json" ),
					de: require( "./translations/germany.json" )
				}
			} )
		);
	} );

	return (
		<ToastProvider placement="top-right">
			<BreadcrumbsProvider>
				<Router>
					<ScrollToTop>
						<Suspense
							fallback={
								<div className="flone-preloader-wrapper">
									<div className="flone-preloader">
										<span></span>
										<span></span>
									</div>
								</div>
							}
						>
							<Switch>
							    {/* Homepages */ }
								<Route
									exact
									path={ process.env.PUBLIC_URL + "/" }
									component={ HomePage }
								/>
								{/* Shop pages */ }
								<Route
									path={ process.env.PUBLIC_URL + "/san-pham/:id" }
									render={ ( routeProps ) => (
										<Product { ...routeProps } key={ routeProps.match.params.id } />
									) }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/san-pham" }
									component={ ShopPage }
								/>

								<Route
									path={ process.env.PUBLIC_URL + "/sp/:slug" }
									render={ ( routeProps ) => (
										<Product { ...routeProps } key={ routeProps.match.params.slug } />
									) }
								/>

								{/* Blog pages */ }
								<Route
									exact
									path={ process.env.PUBLIC_URL + "/tin-tuc" }
									component={ BlogStandard }
								/>
								{/* <Route
									path={ process.env.PUBLIC_URL + "/m/:slug" }
									component={ BlogStandardMenu }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/tag/:slug" }
									component={ BlogTag }
								/> */}
								<Route
									path={ process.env.PUBLIC_URL + "/tin-tuc/:slug" }
									component={ BlogDetailsStandard }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/payment/:type" }
									component={ PaymentStatus }
								/>

								{/* Other pages */ }
								<Route
									path={ process.env.PUBLIC_URL + "/lien-he" }
									component={ Contact }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/tai-khoan" }
									component={ MyAccount }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/don-hang" }
									component={ MyOrder }
								/>
								{/* <Route
									path={ process.env.PUBLIC_URL + "/login-register" }
									component={ LoginRegister }
								/> */}

								<Route
									path={ process.env.PUBLIC_URL + "/dang-nhap" }
									component={ Login }
								/>

								<Route
									path={ process.env.PUBLIC_URL + "/dang-ky" }
									component={ Register }
								/>

								<Route
									path={ process.env.PUBLIC_URL + "/quen-mat-khau" }
									component={ ForgotPassword }
								/>

								<Route
									path={ process.env.PUBLIC_URL + "/doi-mat-khau/:token" }
									component={ ResetPassword }
								/>

								<Route
									path={ process.env.PUBLIC_URL + "/gio-hang" }
									component={ Cart }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/danh-sach-yeu-thich" }
									component={ Wishlist }
								/>

								<Route
									path={ process.env.PUBLIC_URL + "/not-found" }
									component={ NotFound }
								/>

								<Route exact component={ NotFound } />
							</Switch>
						</Suspense>
					</ScrollToTop>
				</Router>
			</BreadcrumbsProvider>
		</ToastProvider>
	);
};

App.propTypes = {
	dispatch: PropTypes.func
};

export default connect()( multilanguage( App ) );
