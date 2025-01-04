import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import { getItem } from "../../helpers/common";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  deleteFromCart,
  iconWhiteClass,
}) => {
  const [activeAccount, setActiveAccount] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const token = getItem("access_token") || null;
  const user = getItem("user") ? JSON.parse(getItem("user")) : null;

  useEffect(() => {
    if (user && user.avatar) {
      setAvatar(user.avatar);
      console.log("avatar: " + avatar);

    } else {
      setAvatar(null);
    }
  }, [user]);
  // if (wishlistData?.length > 0 && token) {
  //   wishlistData = wishlistData.filter((item) => item.user_like === user?.id);
  // }

  // const handleClick = e =>
  // {
  // 	e.currentTarget.nextSibling.classList.toggle( "active" );
  // };

  const handleClick = (e) => {
    // e.currentTarget.nextSibling.classList.toggle( "active" );
    if (e === 1) {
      setActiveAccount(!activeAccount);
      setActiveCart(false);
    } else {
      setActiveAccount(false);
      setActiveCart(!activeCart);
    }
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    // <div
    // 	className={ `header-right-wrap ${ iconWhiteClass ? iconWhiteClass : "" }` }
    // >
    // 	<div className="same-style header-search d-none d-lg-block">
    // 		<button className="search-active" onClick={ e => handleClick( e ) }>
    // 			<i className="pe-7s-search" />
    // 		</button>
    // 		<div className="search-content">
    // 			<form action="javascript:void(0)">
    // 				<input type="text" placeholder="Search" />
    // 				<button className="button-search">
    // 					<i className="pe-7s-search" />
    // 				</button>
    // 			</form>
    // 		</div>
    // 	</div>
    // 	<div className="same-style account-setting d-none d-lg-block">
    // 		<button
    // 			className="account-setting-active"
    // 			onClick={ e => handleClick( e ) }
    // 		>
    // 			<i className="pe-7s-user-female" />
    // 		</button>
    // 		<div className="account-dropdown">
    // 			<ul>
    // 				<li>
    // 					<Link to={ process.env.PUBLIC_URL + "/login-register" }>Login</Link>
    // 				</li>
    // 				<li>
    // 					<Link to={ process.env.PUBLIC_URL + "/login-register" }>
    // 						Register
    // 					</Link>
    // 				</li>
    // 				<li>
    // 					<Link to={ process.env.PUBLIC_URL + "/my-account" }>
    // 						my account
    // 					</Link>
    // 				</li>
    // 			</ul>
    // 		</div>
    // 	</div>
    // 	<div className="same-style header-compare">
    // 		<Link to={ process.env.PUBLIC_URL + "/compare" }>
    // 			<i className="pe-7s-shuffle" />
    // 			<span className="count-style">
    // 				{ compareData && compareData.length ? compareData.length : 0 }
    // 			</span>
    // 		</Link>
    // 	</div>
    // 	<div className="same-style header-wishlist">
    // 		<Link to={ process.env.PUBLIC_URL + "/wishlist" }>
    // 			<i className="pe-7s-like" />
    // 			<span className="count-style">
    // 				{ wishlistData && wishlistData.length ? wishlistData.length : 0 }
    // 			</span>
    // 		</Link>
    // 	</div>
    // 	<div className="same-style cart-wrap d-none d-lg-block">
    // 		<button className="icon-cart" onClick={ e => handleClick( e ) }>
    // 			<i className="pe-7s-shopbag" />
    // 			<span className="count-style">
    // 				{ cartData && cartData.length ? cartData.length : 0 }
    // 			</span>
    // 		</button>
    // 		<MenuCart
    // 			cartData={ cartData }
    // 			currency={ currency }
    // 			deleteFromCart={ deleteFromCart }
    // 		/>
    // 	</div>
    // 	<div className="same-style cart-wrap d-block d-lg-none">
    // 		<Link className="icon-cart" to={ process.env.PUBLIC_URL + "/cart" }>
    // 			<i className="pe-7s-shopbag" />
    // 			<span className="count-style">
    // 				{ cartData && cartData.length ? cartData.length : 0 }
    // 			</span>
    // 		</Link>
    // 	</div>
    // 	<div className="same-style mobile-off-canvas d-block d-lg-none">
    // 		<button
    // 			className="mobile-aside-button"
    // 			onClick={ () => triggerMobileMenu() }
    // 		>
    // 			<i className="pe-7s-menu" />
    // 		</button>
    // 	</div>
    // </div>

    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""} align-items-center`}
    >
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(1)}
        >
          {user && user.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="rounded-circle"
              style={{ width: "30px", height: "30px" }}
            />
          ) : (
            <i className="pe-7s-user" />
          )}
        </button>
        <div className={`account-dropdown ${activeAccount ? "active" : ""}`}>
          <ul className="mb-0">
            {!token && (
              <>
                <li>
                  <Link to={"/login-register"}>Đăng nhập</Link>
                </li>
                <li>
                  <Link to={"/login-register"}>Đăng ký</Link>
                </li>
                {/* <li>
									<Link to={ "/my-account" }>
										my account
									</Link>
								</li> */}
              </>
            )}
            {token && (
              <>
                <li>
                  <Link to={"/tai-khoan"}>Tài khoản</Link>
                </li>
                <li>
                  <Link to={"/don-hang"}>Đơn hàng</Link>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={(e) => {
                      localStorage.removeItem("access_token");
                      localStorage.removeItem("name");
                      localStorage.removeItem("email");
                      localStorage.removeItem("avatar");
                      localStorage.removeItem("gender");
                      localStorage.removeItem("phone");
                      localStorage.removeItem("user");
                      setActiveAccount(false);
                      window.location.href = "/";
                    }}
                  >
                    Đăng xuất
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      { token &&
				<div className="same-style header-wishlist">
					<Link to={ "/wishlist" }>
						<i className="pe-7s-like" />
						<span className="count-style">
							{ wishlistData && wishlistData.length ? wishlistData.length : 0 }
						</span>
					</Link>
				</div>
			}

      {token && (
        <div className="same-style cart-wrap d-none d-lg-block">
          <button className="icon-cart" onClick={(e) => handleClick(2)}>
            <i className="pe-7s-shopbag" />
            <span className="count-style">
              {cartData && cartData.length ? cartData.length : 0}
            </span>
          </button>
          {/* menu cart */}
          <MenuCart
            cartData={cartData}
            currency={currency}
            activeCart={activeCart}
            deleteFromCart={deleteFromCart}
			className=""
          />
        </div>
      )}
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={"/gio-hang"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
