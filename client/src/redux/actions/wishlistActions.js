import { getItem } from "../../helpers/common";

export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";
export const DELETE_ALL_FROM_WISHLIST = "DELETE_ALL_FROM_WISHLIST";

// add to wishlist
export const addToWishlist = (item, addToast) => {
  return (dispatch) => {
    let token = getItem("access_token");
    if (!token) {
      window.location.href = "/login-register";
    } else {
      if (addToast) {
        addToast("Thêm sản phẩm vào danh sách yêu thích", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      dispatch({ type: ADD_TO_WISHLIST, payload: item });
    }

  };
};

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Xóa sản phẩm khỏi danh sách yêu thích", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_FROM_WISHLIST, payload: item });
  };
};

//delete all from wishlist
export const deleteAllFromWishlist = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Xóa tất cả sản phẩm khỏi danh sách yêu thích", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_WISHLIST });
  };
};
