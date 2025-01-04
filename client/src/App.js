import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// home pages
const HomeFashionSeven = lazy( () => import( "./pages/home/HomePage" ) );
const MyOrder = lazy( () => import( "./pages/other/MyOrder" ) );

// shop pages
const ShopGridStandard = lazy( () => import( "./pages/shop/ShopGridStandard" ) );

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
const About = lazy( () => import( "./pages/other/About" ) );
const Contact = lazy( () => import( "./pages/other/Contact" ) );
const MyAccount = lazy( () => import( "./pages/other/MyAccount" ) );
const ResetPassword = lazy( () => import( "./pages/auth/ResetPassword" ) );
const ForgotPassword = lazy( () => import( "./pages/auth/ForgotPassword" ) );
const LoginRegister = lazy( () => import( "./pages/auth/LoginRegister" ) );

const Cart = lazy( () => import( "./pages/other/Cart" ) );
const Wishlist = lazy( () => import( "./pages/other/Wishlist" ) );
const Compare = lazy( () => import( "./pages/other/Compare" ) );
const Checkout = lazy( () => import( "./pages/other/Checkout" ) );

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
								<Route
									exact
									path={ process.env.PUBLIC_URL + "/" }
									component={ HomeFashionSeven }
								/>

								{/* Homepages */ }
								<Route
									path={ process.env.PUBLIC_URL + "/home-fashion-seven" }
									component={ HomeFashionSeven }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/shop-grid-standard" }
									component={ ShopGridStandard }
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
									component={ ShopGridStandard }
								/>

								<Route
									path={ process.env.PUBLIC_URL + "/sp/:slug" }
									render={ ( routeProps ) => (
										<Product { ...routeProps } key={ routeProps.match.params.slug } />
									) }
								/>
								{/* End SP */ }

								{/* Blog pages */ }
								<Route
									exact
									path={ process.env.PUBLIC_URL + "/tin-tuc" }
									component={ BlogStandard }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/m/:slug" }
									component={ BlogStandardMenu }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/tag/:slug" }
									component={ BlogTag }
								/>
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
									path={ process.env.PUBLIC_URL + "/about" }
									component={ About }
								/>
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
								<Route
									path={ process.env.PUBLIC_URL + "/login-register" }
									component={ LoginRegister }
								/>

								<Route
									path={ process.env.PUBLIC_URL + "/auth/forgot-password" }
									component={ ForgotPassword }
								/>

								<Route
									path={ process.env.PUBLIC_URL + "/reset-password/:token" }
									component={ ResetPassword }
								/>

								<Route
									path={ process.env.PUBLIC_URL + "/gio-hang" }
									component={ Cart }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/wishlist" }
									component={ Wishlist }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/compare" }
									component={ Compare }
								/>
								<Route
									path={ process.env.PUBLIC_URL + "/checkout" }
									component={ Checkout }
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
