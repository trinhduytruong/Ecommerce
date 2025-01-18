import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {formatCurrencyVND, getDiscountPrice} from "../../helpers/product";
import ProductModal from "./ProductModal";
import ImageWithFallback from "../ImageWithFallback";
import { DEFAULT_IMAGE } from "../../helpers/constant";
import { truncateText } from "../../helpers/common";

const ProductGridSingle = ({
                               product,
                               currency,
                               addToCart,
                               addToWishlist,
                               addToCompare,
                               cartItem,
                               wishlistItem,
                               compareItem,
                               sliderClassName,
                               spaceBottomClass
                           }) => {
    const [modalShow, setModalShow] = useState(false);
    const {addToast} = useToasts();

    const discountedPrice = getDiscountPrice(product.price, product.sale);
    const finalProductPrice = +(product.price);
    const finalDiscountedPrice = +(
        discountedPrice
    );

    return (
        <Fragment>
            <div
                className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
                    sliderClassName ? sliderClassName : ""
                }`}
            >
                <div
                    className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
                >
                    <div className="product-img">
                        <Link to={ product.slug ? `/sp/${product?.slug}`: `/san-pham/${product.id}`}>
                            <ImageWithFallback
                                src={product?.avatar}
                                alt={product?.name}
                                defaultSrc={DEFAULT_IMAGE}
                            />
                            {/*{product.image.length > 1 ? (*/}
                            {/*    <img*/}
                            {/*        className="hover-img"*/}
                            {/*        src={process.env.PUBLIC_URL + product.image[1]}*/}
                            {/*        alt=""*/}
                            {/*    />*/}
                            {/*) : (*/}
                            {/*    ""*/}
                            {/*)}*/}
                        </Link>
                        {product?.sale || product?.new ? (
                            <div className="product-img-badges">
                                {product.sale ? (
                                    <span className="pink">-{product.sale}%</span>
                                ) : (
                                    ""
                                )}
                                {product.new ? <span className="purple">New</span> : ""}
                            </div>
                        ) : (
                            ""
                        )}

                        <div className="product-action">
                            <div className="pro-same-action pro-wishlist">
                                <button
                                    className={wishlistItem !== undefined ? "active" : ""}
                                    disabled={wishlistItem !== undefined}
                                    title={
                                        wishlistItem !== undefined
                                            ? "Added to wishlist"
                                            : "Add to wishlist"
                                    }
                                    onClick={() => addToWishlist(product, addToast)}
                                >
                                    <i className="pe-7s-like"/>
                                </button>
                            </div>
                            <div className="pro-same-action pro-cart">
                                {product?.affiliateLink ? (
                                    <a
                                        href={product?.affiliateLink}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        {" "}
                                        Buy now{" "}
                                    </a>
                                ) : product.variation && product.variation.length >= 1 ? (
                                    <Link to={product.slug ? `/sp/${product?.slug}`: `/san-pham/${product.id}`}>
                                        Select Option
                                    </Link>
                                ) : product?.number && product?.number > 0 ? (
                                    <button
                                        onClick={() => addToCart(product, addToast)}
                                        className={
                                            cartItem !== undefined && cartItem.quantity > 0
                                                ? "active"
                                                : ""
                                        }
                                        disabled={cartItem !== undefined && cartItem.quantity > 0}
                                        title={
                                            cartItem !== undefined ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"
                                        }
                                    >
                                        {" "}
                                        <i className="pe-7s-cart"></i>{" "}
                                        {cartItem !== undefined && cartItem.quantity > 0
                                            ? "Đã thêm"
                                            : "Thêm vào giỏ hàng"}
                                    </button>
                                ) : (
                                    <button disabled className="active">
                                        Out of Stock
                                    </button>
                                )}
                            </div>
                            <div className="pro-same-action pro-quickview">
                                <button onClick={() => setModalShow(true)} title="Quick View">
                                    <i className="pe-7s-look"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="product-content text-center">
                        <h3>
                            <Link to={product.slug ? `/sp/${product?.slug}`: `/san-pham/${product.id}`}>
                                {truncateText(product?.name, 29)}
                            </Link>
                        </h3>
                        {/*{product.rating && product.rating > 0 ? (*/}
                        {/*    <div className="product-rating">*/}
                        {/*        <Rating ratingValue={product.rating}/>*/}
                        {/*    </div>*/}
                        {/*) : (*/}
                        {/*    ""*/}
                        {/*)}*/}
                        <div className="product-price">
                            {discountedPrice !== null ? (
                                <Fragment>
                                    <span>{formatCurrencyVND(finalDiscountedPrice)}</span>{" "}
                                    <span className="old">
                                    {formatCurrencyVND(finalProductPrice)}
                                  </span>
                                </Fragment>
                            ) : (
                                <span>{formatCurrencyVND(finalProductPrice)} </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* product modal */}
            <ProductModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
                currency={currency}
                discountedprice={discountedPrice}
                finalproductprice={finalProductPrice}
                finaldiscountedprice={finalDiscountedPrice}
                cartitem={cartItem}
                wishlistitem={wishlistItem}
                compareitem={compareItem}
                addtocart={addToCart}
                addtowishlist={addToWishlist}
                addtocompare={addToCompare}
                addtoast={addToast}
            />
        </Fragment>
    );
};

ProductGridSingle.propTypes = {
    addToCart: PropTypes.func,
    addToCompare: PropTypes.func,
    addToWishlist: PropTypes.func,
    cartItem: PropTypes.object,
    compareItem: PropTypes.object,
    currency: PropTypes.object,
    product: PropTypes.object,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    wishlistItem: PropTypes.object
};

export default ProductGridSingle;
