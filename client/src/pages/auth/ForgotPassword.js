import PropTypes from "prop-types";
import React, { Fragment, startTransition, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import { toggleShowLoading } from "../../redux/actions/common";
import { connect, useDispatch } from "react-redux";
import { API_SERVICE } from "../../helpers/apiHelper";
import { Alert, Button, Form } from "react-bootstrap";
import { checkValidate } from "../../helpers/common";
import { useToasts } from "react-toast-notifications";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const FORM_LOGIN = {
  email: { value: "", name: "Email", rules: { required: true } },
};
const ForgotPassword = ({ location, isShowLoading }) => {
  const [form, setForm] = useState({ ...FORM_LOGIN });
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const resetForm = () => {
    setForm({ ...FORM_LOGIN });
    setErrors(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorData = checkValidate(form);
    if (errorData) {
      console.log("errorData login-----> ", errorData, form);
      setErrors({ ...errorData });
      return;
    }
    let body = Object.keys(form).reduce((newItem, key) => {
      newItem[key] = form[key]?.value?.trim();
      return newItem;
    }, {});
    dispatch(toggleShowLoading(true));
    const response = await API_SERVICE.post("auth/forgot-password", body);
    dispatch(toggleShowLoading(false));
    console.log("response login--------> ", response);
    if (response?.status == "success" && response?.data) {
      addToast("Vui lòng kiểm tra email của bạn", {
        appearance: "success",
        autoDismiss: true,
        placement: "top-right",
      });
    } else {
      setErrors({ email: response.message });
      addToast(response.message, {
        appearance: "error",
        autoDismiss: true,
        placement: "top-right",
      });
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Quên mật khẩu</title>
      </MetaTags>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <div className="login-form-container">
                    <div className="login-register-form">
                      <h3 className="text-center mb-2 font-weight-bolder">
                        Quên mật khẩu
                      </h3>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                          <Form.Label
                          // style={{color: "#D14600"}}
                          >
                            Địa chỉ email đăng ký để nhận đường dẫn đặt lại mật
                            khẩu?{" "}
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="ví dụ: example@gmail.com"
                            className="mb-1"
                            value={form?.email?.value}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                email: {
                                  ...form.email,
                                  value: e?.target?.value,
                                },
                              });
                              setErrors({ ...errors, email: null });
                            }}
                            isInvalid={!!errors?.email}
                          />
                          {errors?.email && (
                            <span className="text-danger">{errors?.email}</span>
                          )}
                        </Form.Group>
                        <div className="button-box d-flex justify-content-center">
                          <button type="submit" disabled={isShowLoading}>
                            <span>
                              {isShowLoading ? "Logging in..." : "Xác nhận"}
                            </span>
                          </button>
                        </div>
                      </Form>
                      <div className="login-toggle-btn mt-3 d-flex justify-content-between">
                        <p>
                          Bạn chưa có tài khoản? Đăng ký
                          <u className="text-info">
                            <Link
                              to={"/dang-ky"}
                              className="font-italic text-primary  mx-2"
                            >
                              tại đây
                            </Link>
                          </u>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = function (state) {
  return {
    isShowLoading: state.commonReducer.showLoading,
  };
};

export default withRouter(connect(mapStateToProps)(ForgotPassword));
