import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect, useDispatch } from "react-redux";
import { formatCurrencyVND, getDiscountPrice } from "../../helpers/product";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart,
  addCouponToCard,
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { getItem, getMomentDate, onErrorImage } from "../../helpers/common";
import { Toast } from "react-bootstrap";
import { toggleShowLoading } from "../../redux/actions/common";
import { API_SERVICE } from "../../helpers/apiHelper";

const Cart = ({
  location,
  cartItems,
  currency,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart,
  isShowLoading,
  addCouponToCard,
}) => {
  const [quantityCount] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [validationError, setValidationError] = useState("");
  const [payment_method_id, setPaymentMethodId] = useState("1");
  const [listPayments, setListPayments] = useState([]);
  const user = getItem("user") ? JSON.parse(getItem("user")) : null;
  const { addToast } = useToasts();
  const { pathname } = location;
  let cartTotalPrice = 0;

  useEffect(() => {
    getListPayment();
  }, []);

  const dispatch = useDispatch();

  const addOrder = async () => {
    if (!address || address.trim() === "") {
      setValidationError("Vui lòng nhập địa chỉ của bạn.");
      return;
    }
    setValidationError("");

    let body = {
      user_id: user?.id,
      payment_method_id: Number(payment_method_id) || 1,
      shipping_fee: 0,
      payment_status: "pending",
      status: "pending",
      coupon_code: coupon?.trim(),
      total_amount: cartTotalPrice,
      tax_amount: 0,
      discount_amount: 0,
      address: address,
      sub_total: cartItems?.reduce((newTotal, item) => {
        newTotal += Number(item.price) * Number(item.quantity);
        return newTotal;
      }, 0),
      // completed_at: getMomentDate(),
      notes: note,
      products: cartItems?.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };
    console.log(body);
    dispatch(toggleShowLoading(true));
    const response = await API_SERVICE.post("users/orders", body);

    dispatch(toggleShowLoading(false));
    if (response?.status == "success") {
      addToast("Checkout successfully", {
        appearance: "success",
        autoDismiss: true,
        placement: "top-right",
      });

      deleteAllFromCart();
      setNote("");
      setCoupon("");
      if (body.payment_method_id !== 1) {
        try {
          const rs = await API_SERVICE.paymentOrder(response?.data?.data);
          console.info("response: ", rs);
          window.open(rs?.link, "_bank");
          return;
        } catch (err) {
          console.info("response: ", err);
        }
      }
    } else {
      addToast(response?.message || "Checkout failed", {
        appearance: "error",
        autoDismiss: true,
        placement: "top-right",
      });
    }
  };

  const getListPayment = async () => {
    const response = await API_SERVICE.get("payments-method", {
      page: 1,
      page_size: 20,
      status: "active",
    });
    if (response?.status == "success") {
      setListPayments(response?.data?.data);
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Giỏ hàng</title>
        <meta
          name="description"
          content="Cart page of flone react minimalist eCommerce."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Giỏ hàng
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Danh sách sản phẩm</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems?.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.sale
                            );
                            const finalProductPrice = cartItem.price.toFixed(2);
                            const finalDiscountedPrice =
                              Number(discountedPrice).toFixed(2);

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      cartItem.slug
                                        ? `/sp/${cartItem?.slug}`
                                        : `/san-pham/${cartItem.id}`
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={cartItem.avatar}
                                      onError={(e) => onErrorImage(e)}
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      cartItem.slug
                                        ? `/sp/${cartItem?.slug}`
                                        : `/san-pham/${cartItem.id}`
                                    }
                                  >
                                    {cartItem.name}
                                  </Link>
                                  {cartItem.selectedProductColor &&
                                  cartItem.selectedProductSize ? (
                                    <div className="cart-item-variation">
                                      <span>
                                        Color: {cartItem.selectedProductColor}
                                      </span>
                                      <span>
                                        Size: {cartItem.selectedProductSize}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {
                                          // currency.currencySymbol +
                                          formatCurrencyVND(finalProductPrice)
                                        }
                                      </span>
                                      <span className="amount">
                                        {
                                          // currency.currencySymbol +
                                          formatCurrencyVND(
                                            finalDiscountedPrice
                                          )
                                        }
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {
                                        //   currency.currencySymbol +
                                        formatCurrencyVND(finalProductPrice)
                                      }
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        decreaseQuantity(cartItem, addToast)
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        addToCart(
                                          cartItem,
                                          addToast,
                                          quantityCount
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(
                                            cartItem,
                                            cartItem.selectedProductColor,
                                            cartItem.selectedProductSize
                                          )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {formatCurrencyVND(
                                    discountedPrice !== null
                                      ? // currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : // currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)
                                  )}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      deleteFromCart(cartItem, addToast)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/"}>
                          Tiếp tục mua hàng
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>
                          Xóa giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6 mb-4">
                    <div className="discount-code-wrapper h-100">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Địa chỉ giao hàng
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Địa chỉ của bạn.</p>
                        <textarea
                          rows={5}
                          className={`form-control ${
                            validationError ? "is-invalid" : ""
                          }`}
                          onChange={(e) => {
                            setAddress(e?.target?.value);
                            if (validationError) {
                              setValidationError("");
                            }
                          }}
                        ></textarea>
                        {validationError && (
                          <div className="invalid-feedback">
                            {validationError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 mb-4">
                    <div className="discount-code-wrapper h-100">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Thanh toán
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Hình thức thanh toán.</p>
                        <div className="form-group">
                          {listPayments?.length > 0 &&
                            listPayments?.map((item, key) => {
                              return (
                                <div className="d-flex align-items-center mb-3">
                                  <label
                                    className={`pro-details-color-content--single mb-0`}
                                    key={1}
                                  >
                                    <input
                                      type="radio"
                                      name="payment"
                                      style={{
                                        maxWidth: "36px",
                                        maxHeight: "20px",
                                      }}
                                      value={item.id}
                                      key={key}
                                      checked={item.id == payment_method_id}
                                      onChange={() =>
                                        setPaymentMethodId(item.id)
                                      }
                                      className="form-check-sm"
                                    ></input>
                                    <span className="checkmark"></span>
                                  </label>

                                  <p
                                    className="mx-2 mb-1"
                                    style={{ fontSize: "16px" }}
                                  >
                                    {item.name}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper h-100">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Ghi chú
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Ghi chú của bạn.</p>
                        <textarea
                          rows={5}
                          className="form-control"
                          onChange={(e) => {
                            setNote(e?.target?.value);
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper h-100">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Mã giảm giá
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Nhập mã giảm giá của bạn.</p>
                        <form>
                          <input
                            type="text"
                            required
                            name="name"
                            onChange={(e) => {
                              setCoupon(e?.target?.value);
                            }}
                          />
                          {/* <button className="cart-btn-2" onClick={ ( e ) =>
													{
														e.preventDefault();
														addCouponToCard( { coupon_code: coupon }, addToast )
													} }>
														Apply Coupon
													</button> */}
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className=" col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {formatCurrencyVND(cartTotalPrice.toFixed(2))}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          {formatCurrencyVND(cartTotalPrice.toFixed(2))}
                          {/* {currency.currencySymbol + cartTotalPrice.toFixed(2)} */}
                        </span>
                      </h4>
                      <a
                        href="javascript:void(0)"
                        onClick={(e) => {
                          if (!isShowLoading) {
                            addOrder();
                          }
                        }}
                        // to={ process.env.PUBLIC_URL + "/checkout" }
                      >
                        Mua hàng
                      </a>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không có sản phẩm trong giỏ hàng <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/san-pham"}>
                        Cửa hàng
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
  addCouponToCard: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    isShowLoading: state.commonReducer.showLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
    addCouponToCard: (item, addToast) => {
      dispatch(addCouponToCard(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
