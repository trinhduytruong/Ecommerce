import { DEFAULT_IMAGE, DEFAULT_IMG, ERROR_MESSAGE } from "./constant";
import * as moment from "moment";

export const getItem = (key) => {
  return localStorage.getItem(key) || null;
};

export const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const buildFilter = (values) => {
  let params = {};
  if (values) {
    delete values.total;
    delete values.total_pages;
    delete values.count;
    let arrCondition = Object.entries(values);

    params = arrCondition.reduce((param, item) => {
      if (item[1] != null) {
        param = { ...param, ...buildItemParam(item[0], item[1], param) };
      }
      return param;
    }, {});
  }
  return params;
};

export const buildItemParam = (key, value, params) => {
  if (key == "page" && !value) {
    params["page"] = value;
  } else if (value) {
    params[`${key}`] = value;
  }
  return params;
};

export const resetForm = (form) => {
  form.resetFields();
};

export const onFieldsChange = (e, form, ee = null) => {
  if (e.length > 0) {
    let value = typeof e[0].value === "string" ? e[0].value : e[0].value;
    if (e[0].name[0] === "name" && value != "") {
      // let slug = toSlug( value );
      form.setFieldsValue({ slug: value });
    }
    let fieldValue = {
      [String(e[0].name[0])]: value,
    };
    form.setFieldsValue(fieldValue);
  }
};

export const buildImage = (img, is_user = false) => {
  if (img) {
    return img;
    return process.env.REACT_APP_URL_UPLOAD + "/upload/" + img;
  } else return is_user ? DEFAULT_IMG : DEFAULT_IMAGE;
};

export const onErrorImage = (e) => {
  e.currentTarget.src = DEFAULT_IMAGE;
};

export const onErrorUser = (e) => {
  e.currentTarget.src = DEFAULT_IMG;
};

export const checkValidate = (validates) => {
  if (validates) {
    const errors = {};

    Object.keys(validates).forEach((field) => {
      const value = validates[field]?.value;
      const rules = validates[field]?.rules;
      const name = validates[field]?.name;

      if (rules?.required && !value) {
        errors[field] = ERROR_MESSAGE(name || field).required;
      } else {
        if (rules?.minLength && value?.length < rules?.minLength) {
          errors[field] = ERROR_MESSAGE(name || field).minLength(
            rules?.minLength
          );
        }
        if (rules?.maxLength && value?.length > rules?.maxLength) {
          errors[field] = ERROR_MESSAGE(name || field).maxLength(
            rules?.maxLength
          );
        }
        if (rules?.regex && !rules?.regex?.test(value)) {
          errors[field] = ERROR_MESSAGE(name || field).pattern();
        }
      }
    });

    return errors && Object.entries(errors)?.length > 0 ? errors : null;
  }
  return null;
};

export const getMomentDate = () => {
  return moment().format("YYYY-MM-DD");
};

export const customNumber = (number, valueCustom) => {
  // return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + valueCustom;
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫" || "";
};

export const formatTime = (time, format) => {
  return moment(time).format(format);
};

export const logout = () => {
  removeItem("user");
  removeItem("access_token");
  window.location.href = "/login-register";
};
