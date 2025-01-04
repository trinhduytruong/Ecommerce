import { getItem } from "../../helpers/common";

export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const ADD_COUPON = "ADD_COUPON";

//add to cart
export const addToCart = (
  item,
  addToast,
  quantityCount,
  selectedProductColor,
  selectedProductSize
) => {
  return (dispatch) => {
    let token = getItem("access_token");
    if (!token) {
      window.location.href = "/login-register";
    } else {
      if (addToast) {
        addToast("Thêm sản phẩm vào giỏ hàng", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      dispatch({
        type: ADD_TO_CART,
        payload: {
          ...item,
          quantity: quantityCount,
          selectedProductColor: selectedProductColor
            ? selectedProductColor
            : item.selectedProductColor
            ? item.selectedProductColor
            : null,
          selectedProductSize: selectedProductSize
            ? selectedProductSize
            : item.selectedProductSize
            ? item.selectedProductSize
            : null,
        },
      });
    }
  };
};
//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Item Decremented From Cart", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Xóa sản phẩm khỏi giỏ hàng", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
export const deleteAllFromCart = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Xóa tất cả sản phẩm trong giỏ hàng", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      ?.filter((single) => single.color === color)[0]
      .size?.filter((single) => single.name === size)[0].stock;
  }
};

//add coupon
export const addCouponToCard = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Update coupon successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    }
    dispatch({ type: ADD_COUPON, payload: item });
  };
};
