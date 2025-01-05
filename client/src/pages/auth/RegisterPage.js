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

const FORM_REGISTER = {
  name: { value: "", name: "Họ và tên", rules: { required: true } },
  email: { value: "", name: "Email", rules: { required: true } },
  password: {
    value: "",
    name: "Mật khẩu",
    rules: { required: true, minLength: 6 },
  },
};
const Register = ({ location }) => {
  const { pathname } = location;
  const [formRegister, setFormRegister] = useState({ ...FORM_REGISTER });

  const [errors, setErrors] = useState(null);
  const [errorsRegister, setErrorsRegister] = useState(null);
  const [tab, setTab] = useState(null);
  const { addToast } = useToasts();

  // Lấy tab từ URL khi component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const activeTab = queryParams.get("tab") || "login"; // Mặc định là 'login'
    setTab(activeTab);
  }, [location.search]);

  const dispatch = useDispatch();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    let errorData = checkValidate(formRegister);
    if (errorData) {
      console.log("errorData -----> ", errorData, formRegister);
      setErrorsRegister({ ...errorData });
      return;
    }
    let body = Object.keys(formRegister).reduce((newItem, key) => {
      newItem[key] = formRegister[key]?.value?.trim();
      return newItem;
    }, {});
    dispatch(toggleShowLoading(true));
    const response = await API_SERVICE.post("auth/register", {
      ...body,
      user_type: "USER",
    });
    dispatch(toggleShowLoading(false));
    console.log("response --------> ", response);
    if (response?.status == "success" && response?.data) {
      addToast("Đăng ký thành công", {
        appearance: "success",
        autoDismiss: true,
        placement: "top-right",
      });
      // localStorage.setItem( 'access_token', response?.data?.token );
      // localStorage.setItem( 'user', JSON.stringify( response?.data?.user ) );
      window.location.href = "/dang-nhap";
    } else {
      addToast(response?.message, { appearance: "error", autoDismiss: true });
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Đăng ký</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Đăng ký
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Đăng ký</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <Form onSubmit={handleSubmitRegister}>
                              <Form.Group controlId="formName">
                                <Form.Label>Họ và tên </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Nhập họ và tên"
                                  className="mb-1"
                                  value={formRegister?.name?.value}
                                  onChange={(e) => {
                                    setFormRegister({
                                      ...formRegister,
                                      name: {
                                        ...formRegister.name,
                                        value: e?.target?.value,
                                      },
                                    });
                                    setErrorsRegister({
                                      ...errorsRegister,
                                      name: null,
                                    });
                                  }}
                                  isInvalid={!!errorsRegister?.name}
                                />
                                {errorsRegister?.name && (
                                  <span className="text-danger">
                                    {errorsRegister?.name}
                                  </span>
                                )}
                              </Form.Group>
                              <Form.Group controlId="formEmail">
                                <Form.Label>Email </Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="Nhập email"
                                  className="mb-1"
                                  value={formRegister?.email?.value}
                                  onChange={(e) => {
                                    setFormRegister({
                                      ...formRegister,
                                      email: {
                                        ...formRegister.email,
                                        value: e?.target?.value,
                                      },
                                    });
                                    setErrorsRegister({
                                      ...errorsRegister,
                                      email: null,
                                    });
                                  }}
                                  isInvalid={!!errorsRegister?.email}
                                />
                                {errorsRegister?.email && (
                                  <span className="text-danger">
                                    {errorsRegister?.email}
                                  </span>
                                )}
                              </Form.Group>

                              <Form.Group controlId="formPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                  type="password"
                                  placeholder="Nhập mật khẩu"
                                  className="mb-1"
                                  value={formRegister?.password?.value}
                                  onChange={(e) => {
                                    setFormRegister({
                                      ...formRegister,
                                      password: {
                                        ...formRegister.password,
                                        value: e?.target?.value,
                                      },
                                    });
                                    setErrorsRegister({
                                      ...errorsRegister,
                                      password: null,
                                    });
                                  }}
                                  isInvalid={!!errorsRegister?.password}
                                />
                                {errorsRegister?.password && (
                                  <span className="text-danger">
                                    {errorsRegister?.password}
                                  </span>
                                )}
                              </Form.Group>
                              <div className="button-box d-flex justify-content-between align-items-center">
                                <div className="login-toggle-btn">
                                  <Link
                                    to="/dang-nhap"
                                  >
                                    Bạn đã có tài khoản?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Đăng Ký</span>
                                </button>
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

Register.propTypes = {
  location: PropTypes.object,
};

export default Register;
