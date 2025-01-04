import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toggleShowLoading } from "../../redux/actions/common";
import { checkValidate, getItem, onErrorUser } from "../../helpers/common";
import { API_SERVICE } from "../../helpers/apiHelper";
import { useToasts } from "react-toast-notifications";
import { connect, useDispatch } from "react-redux";

import { FaSave, FaTrash, FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
const FORM_PROFILE = {
  name: { value: "", name: "Họ và tên", rules: { required: true } },
  email: { value: "", name: "Email", rules: { required: true } },
  phone: { value: "", name: "Số điện thoại", rules: { pattern: /^[0-9]+$/g } },
  address: { value: "", name: "Địa chỉ" },
  // password: { value: "", name: "Mật khẩu", rules: { required: true, minLength: 6 } },
};
const FORM_PASSWORD = {
  old_password: { value: "", name: "Mật khẩu cũ", rules: { required: true } },
  password: {
    value: "",
    name: "Mật khẩu mới",
    rules: { required: true, minLength: 6 },
  },
  confirm_password: {
    value: "",
    name: "Xác nhận mật khẩu",
    rules: { required: true, minLength: 6 },
  },
};
const MyAccount = ({ location, isShowLoading }) => {
  const { pathname } = location;
  const [form, setForm] = useState({ ...FORM_PROFILE });
  const [formPassword, setFormPassword] = useState({ ...FORM_PASSWORD });

  const [errors, setErrors] = useState(null);
  const [errorsPassword, setErrorsPassword] = useState(null);
  const [file, setFile] = useState({
    file_name: null,
    url: null,
  });

  const { addToast } = useToasts();

  useEffect(() => {
    let user = getItem("user") ? JSON.parse(getItem("user")) : null;
    if (user) {
      setForm({
        name: { ...FORM_PROFILE.name, value: user.name },
        email: { ...FORM_PROFILE.email, value: user.email },
        address: { ...FORM_PROFILE.address, value: user.address },
        phone: { ...FORM_PROFILE.phone, value: user.phone },
      });
      setFile({ ...file, url: user?.avatar });
    }
  }, []);

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
    if (file?.file_name) {
      dispatch(toggleShowLoading(true));

      const fileResponse = await API_SERVICE.uploadFile(file.file_name);
      dispatch(toggleShowLoading(false));

      if (fileResponse?.status == "success") {
        body.avatar = fileResponse?.data;
      } else {
        addToast("Có lỗi xảy ra khi tải ảnh", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
    }
    dispatch(toggleShowLoading(true));
    const response = await API_SERVICE.put("me", body);
    dispatch(toggleShowLoading(false));
    console.log("response --------> ", response);
    if (response?.status == "success" && response?.data) {
      localStorage.setItem("user", JSON.stringify(response?.data));
      addToast("Cập nhật thành công", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast(response?.message, { appearance: "error", autoDismiss: true });
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    let errorData = checkValidate(formPassword);
    if (
      !errorData &&
      formPassword?.password?.value?.trim() !=
        formPassword?.confirm_password?.value?.trim()
    ) {
      errorData = {
        ...errorData,
        confirm_password: "Mật khẩu không trùng khớp.",
      };
    }
    if (errorData) {
      console.log("errorData formPassword-----> ", errorData, formPassword);
      setErrorsPassword({ ...errorData });
      return;
    }
    let body = Object.keys(formPassword).reduce((newItem, key) => {
      newItem[key] = formPassword[key]?.value?.trim();
      return newItem;
    }, {});
    dispatch(toggleShowLoading(true));
    const response = await API_SERVICE.put("me/change-password", body);
    dispatch(toggleShowLoading(false));
    console.log("response --------> ", response);
    if (response?.status == "success" && response?.data) {
      // localStorage.setItem( 'user', JSON.stringify( response?.data ) );
      setFormPassword({ ...FORM_PASSWORD });
      addToast("Cập nhật thành công", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast(response?.message, { appearance: "error", autoDismiss: true });
    }
  };

  const handleAlbumImageChange = (event) => {
    let file = event?.target?.files[0];

    const newPreviewUrls = {
      url: URL.createObjectURL(file),
      file_name: file,
    };

    setFile(newPreviewUrls);
  };

  const removeAlbumImage = (index) => {
    setFile({
      file_name: null,
      url: null,
    });
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Tài Khoản</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Tài khoản
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span>Cập nhật thông tin{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Thông tin tài khoản</h4>
                            </div>
                            <Form onSubmit={handleSubmit}>
                              <Row>
                                <Col md={6} xs={12}>
                                  <Form.Group className="mb-3 flex-grow-1">
                                    <Form.Label>Avatar</Form.Label>
                                    <div className="album-images-container">
                                      {file?.url ? (
                                        <Card className="h-100 position-relative border-0">
                                          <Card.Img
                                            variant="top"
                                            src={file.url}
                                            onError={onErrorUser}
                                            alt={`Product`}
                                            style={{
                                              height: "100px",
                                              width: "100px",
                                              objectFit: "cover",
                                            }}
                                          />
                                          <Button
                                            variant="danger"
                                            size="sm"
                                            className="position-absolute d-flex top-0 end-0 m-1 rounded-circle p-1"
                                            onClick={() =>
                                              removeAlbumImage(null)
                                            }
                                            style={{
                                              width: "20px",
                                              height: "20px",
                                            }}
                                          >
                                            <MdClose size={12} />
                                          </Button>
                                        </Card>
                                      ) : (
                                        <Col xs={6}>
                                          <Card
                                            className="d-flex justify-content-center align-items-center"
                                            style={{
                                              height: "100px",
                                              width: "100px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              document
                                                .getElementById("album-upload")
                                                .click()
                                            }
                                          >
                                            <div className="text-center p-2">
                                              <FaPlus
                                                size={20}
                                                className="mb-1"
                                              />
                                              <div
                                                style={{ fontSize: "0.8rem" }}
                                              >
                                                Thêm ảnh
                                              </div>
                                            </div>
                                          </Card>
                                          <Form.Control
                                            id="album-upload"
                                            type="file"
                                            multiple
                                            onChange={handleAlbumImageChange}
                                            style={{ display: "none" }}
                                            accept="image/*"
                                          />
                                        </Col>
                                      )}
                                    </div>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group controlId="formName">
                                    <Form.Label>Họ và tên </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Nhập họ và tên"
                                      className="mb-1"
                                      value={form?.name?.value}
                                      onChange={(e) => {
                                        setForm({
                                          ...form,
                                          name: {
                                            ...form.name,
                                            value: e?.target?.value,
                                          },
                                        });
                                        setErrors({ ...errors, name: null });
                                      }}
                                      isInvalid={!!errors?.name}
                                    />
                                    {errors?.name && (
                                      <span className="text-danger">
                                        {errors?.name}
                                      </span>
                                    )}
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
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
                                </Col>
                                <Col md={6}>
                                  <Form.Group controlId="formPhone">
                                    <Form.Label>Số điện thoại </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Nhập số điện thoại"
                                      className="mb-1"
                                      value={form?.phone?.value}
                                      onChange={(e) => {
                                        setForm({
                                          ...form,
                                          phone: {
                                            ...form.phone,
                                            value: e?.target?.value,
                                          },
                                        });
                                        setErrors({ ...errors, phone: null });
                                      }}
                                      isInvalid={!!errors?.phone}
                                    />
                                    {errors?.phone && (
                                      <span className="text-danger">
                                        {errors?.phone}
                                      </span>
                                    )}
                                  </Form.Group>
                                </Col>
                              </Row>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button type="submit">Cập nhật</button>
                                </div>
                              </div>
                            </Form>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Đổi mật khẩu
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Thay đổi mật khẩu</h4>
                            </div>
                            <Form onSubmit={handleSubmitPassword}>
                              <Form.Group
                                className="billing-info"
                                controlId="formOldPassword"
                              >
                                <Form.Label>Mật khẩu cũ </Form.Label>
                                <Form.Control
                                  type="password"
                                  placeholder="Nhập mật khẩu cũ"
                                  className="mb-1"
                                  value={formPassword?.old_password?.value}
                                  onChange={(e) => {
                                    setFormPassword({
                                      ...formPassword,
                                      old_password: {
                                        ...formPassword.old_password,
                                        value: e?.target?.value,
                                      },
                                    });
                                    setErrorsPassword({
                                      ...errorsPassword,
                                      old_password: null,
                                    });
                                  }}
                                  isInvalid={!!errorsPassword?.old_password}
                                />
                                {errorsPassword?.old_password && (
                                  <span className="text-danger">
                                    {errorsPassword?.old_password}
                                  </span>
                                )}
                              </Form.Group>

                              <Form.Group
                                className="billing-info"
                                controlId="formEmail"
                              >
                                <Form.Label
                                // style={{color: "#D14600"}}
                                >
                                  Mật khẩu mới{" "}
                                </Form.Label>
                                <Form.Control
                                  type="password"
                                  placeholder="Nhập mật khẩu mới"
                                  className="mb-1"
                                  value={formPassword?.password?.value}
                                  onChange={(e) => {
                                    setFormPassword({
                                      ...formPassword,
                                      password: {
                                        ...formPassword.password,
                                        value: e?.target?.value,
                                      },
                                    });
                                    setErrorsPassword({
                                      ...errorsPassword,
                                      password: null,
                                    });
                                  }}
                                  isInvalid={!!errorsPassword?.password}
                                />
                                {errorsPassword?.password && (
                                  <span className="text-danger">
                                    {errorsPassword?.password}
                                  </span>
                                )}
                              </Form.Group>

                              <Form.Group controlId="formConfirm">
                                <Form.Label>Xác nhận mật khẩu </Form.Label>
                                <Form.Control
                                  type="password"
                                  placeholder="Xác nhận lại mật khẩu"
                                  className="mb-1"
                                  value={formPassword?.confirm_password?.value}
                                  onChange={(e) => {
                                    setFormPassword({
                                      ...formPassword,
                                      confirm_password: {
                                        ...formPassword.confirm_password,
                                        value: e?.target?.value,
                                      },
                                    });
                                    setErrorsPassword({
                                      ...errorsPassword,
                                      confirm_password: null,
                                    });
                                  }}
                                  isInvalid={!!errorsPassword?.confirm_password}
                                />
                                {errorsPassword?.confirm_password && (
                                  <span className="text-danger">
                                    {errorsPassword?.confirm_password}
                                  </span>
                                )}
                              </Form.Group>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button type="submit">Cập nhật</button>
                                </div>
                              </div>
                            </Form>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = function (state) {
  return {
    isShowLoading: state.commonReducer.showLoading,
  };
};

export default withRouter(connect(mapStateToProps)(MyAccount));
