import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { onErrorImage } from "../../helpers/common";

const ImageSliderOneSingle = ({ data, sliderClass }) => {
  return (
    <div className={`single-image ${sliderClass ? sliderClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + data.link}>
        <img src={process.env.PUBLIC_URL + data.image} alt="" onError={(e) => onErrorImage(e)} />
      </Link>
    </div>
  );
};

ImageSliderOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default ImageSliderOneSingle;
