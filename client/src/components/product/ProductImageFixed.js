import PropTypes from "prop-types";
import React from "react";
import { onErrorImage } from "../../helpers/common";

const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      {product.sale || product.new ? (
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

      <div className="product-fixed-image">
        {product.image && product?.image?.length > 0 ? (
          <img
            src={product.image[0]}
            alt=""
			onError={(e) => onErrorImage(e)}
            className="img-fluid"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object
};

export default ProductImageFixed;
