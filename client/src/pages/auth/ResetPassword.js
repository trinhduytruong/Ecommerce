import PropTypes from "prop-types";
import React, { Fragment, startTransition, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { toggleShowLoading } from "../../redux/actions/common";
import { connect, useDispatch } from "react-redux";
import { API_SERVICE } from "../../helpers/apiHelper";
import { Alert, Button, Form } from "react-bootstrap";
import { checkValidate } from "../../helpers/common";
import { useToasts } from "react-toast-notifications";
import {
  useHistory,
  useParams,
  withRouter,
} from "react-router-dom/cjs/react-router-dom.min";

const FORM_LOGIN = {
  password: {
    value: "",
    name: "Mật khẩu",
    rules: { required: true, minLength: 6 },
  },
  confirm_password: {
    value: "",
    name: "Xác nhận mật khẩu",
    rules: { required: true, minLength: 6 },
  },
};
const ResetPassword = ({ location, isShowLoading }) => {
  const [form, setForm] = useState({ ...FORM_LOGIN });
  const { token } = useParams();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorData = checkValidate(form);
    if (
      !errorData &&
      form?.password?.value?.trim() != form?.confirm_password?.value?.trim()
    ) {
      errorData = {
        ...errorData,
        confirm_password: "Mật khẩu không trùng khớp.",
      };
    }
    if (errorData) {
      console.log("errorData -----> ", errorData, form);
      setErrors({ ...errorData });
      return;
    }
    let body = Object.keys(form).reduce((newItem, key) => {
      newItem[key] = form[key]?.value?.trim();
      return newItem;
    }, {});
    dispatch(toggleShowLoading(true));
    const response = await API_SERVICE.post("auth/reset-password", {
      ...body,
      token: token,
    });
    dispatch(toggleShowLoading(false));
    console.log("response --------> ", response);
    if (response?.status == "success" && response?.data) {
      addToast("Đổi mật khẩu thành công", {
        appearance: "success",
        autoDismiss: true,
        placement: "top-right",
      });
      history.push("/dang-nhap");
    } else {
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
        <title>Đổi mật khẩu</title>
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
                        Đổi mật khẩu
                      </h3>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                          <Form.Label
                          // style={{color: "#D14600"}}
                          >
                            Mật khẩu mới{" "}
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            className="mb-1"
                            value={form?.password?.value}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                password: {
                                  ...form.password,
                                  value: e?.target?.value,
                                },
                              });
                              setErrors({ ...errors, password: null });
                            }}
                            isInvalid={!!errors?.password}
                          />
                          {errors?.password && (
                            <span className="text-danger">
                              {errors?.password}
                            </span>
                          )}
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                          <Form.Label>Xác nhận mật khẩu </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Xác nhận lại mật khẩu"
                            className="mb-1"
                            value={form?.confirm_password?.value}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                confirm_password: {
                                  ...form.confirm_password,
                                  value: e?.target?.value,
                                },
                              });
                              setErrors({ ...errors, confirm_password: null });
                            }}
                            isInvalid={!!errors?.confirm_password}
                          />
                          {errors?.confirm_password && (
                            <span className="text-danger">
                              {errors?.confirm_password}
                            </span>
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

ResetPassword.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = function (state) {
  return {
    isShowLoading: state.commonReducer.showLoading,
  };
};

export default withRouter(connect(mapStateToProps)(ResetPassword));
