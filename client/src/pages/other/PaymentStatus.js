import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ERROR_PAYMENT, SUCCESS_PAYMENT } from "../../helpers/constant";
import { API_SERVICE } from "../../helpers/apiHelper";

const PaymentStatus = ({ location }) => {
  const { pathname, search } = location;

  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();
  const queryParams = new URLSearchParams(search);

  useEffect(() => {
    if (params.type === "failure") {
      setImg(ERROR_PAYMENT);
      setTitle("Failed!");
      updatePaymentStatus();
    } else if (params.type === "success") {
      setImg(SUCCESS_PAYMENT);
      setTitle("Successfully!");
      updatePaymentStatus();
    } else {
      setImg(SUCCESS_PAYMENT);
      updatePaymentStatus();
      setContent("Payment successfully");
    }
  }, [params.type]);

  const updatePaymentStatus = async () => {
    const status = queryParams.get("vnp_ResponseCode");
    const dataOrder = {
      id: queryParams.get("vnp_TxnRef"),
      secure_hash: queryParams.get("vnp_SecureHash"),
      order_ref: queryParams.get("vnp_TransactionNo"),
      payment_status: status === "00" ? "completed" : "failed",
    };
    const response = await API_SERVICE.put(
      "users/orders/update-payment-status",
      dataOrder
    );
    console.info("===========[] ===========[response] : ", response);
    // Loại bỏ query parameters khỏi URL
    const baseUrl = window.location.href.split("?")[0];
    window.history.replaceState(null, null, baseUrl);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Thanh toán</title>
        <meta
          name="description"
          content="404 page of flone react minimalist eCommerce."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Thanh toán
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                {img && (
                  <img
                    src={img}
                    style={{ width: "80px", height: "80px" }}
                    alt="payment"
                    className="d-block mx-auto"
                  />
                )}
                <h2 className="text-center">Payment {title}</h2>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

PaymentStatus.propTypes = {
  location: PropTypes.object,
};

export default PaymentStatus;
