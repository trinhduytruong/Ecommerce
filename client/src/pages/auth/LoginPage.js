import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { toggleShowLoading } from "../../redux/actions/common";
import { useDispatch } from "react-redux";
import { API_SERVICE } from "../../helpers/apiHelper";
import { Form } from "react-bootstrap";
import { checkValidate } from "../../helpers/common";
import { useToasts } from "react-toast-notifications";

const FORM_LOGIN = {
  email: { value: "", name: "Email", rules: { required: true } },
  password: {
    value: "",
    name: "Mật khẩu",
    rules: { required: true, minLength: 6 },
  },
};

const Login = ({ location }) => {
  const { pathname } = location;
  const [form, setForm] = useState({ ...FORM_LOGIN });

  const [errors, setErrors] = useState(null);
  const [tab, setTab] = useState(null);
  const { addToast } = useToasts();

  // Lấy tab từ URL khi component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const activeTab = queryParams.get("tab") || "login"; // Mặc định là 'login'
    setTab(activeTab);
  }, [location.search]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorData = checkValidate(form);
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
    const response = await API_SERVICE.post("auth/login", body);
    dispatch(toggleShowLoading(false));
    console.log("response --------> ", response);
    if (response?.status == "success" && response?.data) {
      localStorage.setItem("access_token", response?.data?.token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      addToast("Đăng nhập thành công", {
        appearance: "success",
        autoDismiss: true,
        // placement: "top-right",
      });
      window.location.href = "/";
    } else {
      addToast(response?.message, { appearance: "error", autoDismiss: true });
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Đăng nhập</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Đăng nhập
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Đăng nhập</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <Form onSubmit={handleSubmit}>
                              <Form.Group controlId="formEmail">
                                <Form.Label>Email </Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="Nhập email"
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
                                  <span className="text-danger">
                                    {errors?.email}
                                  </span>
                                )}
                              </Form.Group>

                              <Form.Group controlId="formPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                  type="password"
                                  placeholder="Nhập mật khẩu"
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
                              <div className="button-box d-flex justify-content-between align-items-center">
                                <div className="login-toggle-btn">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/quen-mat-khau"
                                    }
                                  >
                                    Quên mật khẩu?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Đăng nhập</span>
                                </button>
                              </div>
                              <div className="button-box d-flex justify-content-between align-items-center">
                              <div className="login-toggle-btn p-0">
                                  <Link
                                    to="/dang-ky"
                                  >
                                    Bạn chưa có tài khoản?
                                  </Link>
                                </div>
                              </div>
                            </Form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Login.propTypes = {
  location: PropTypes.object,
};

export default Login;
