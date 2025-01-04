import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import { API_SERVICE, get } from "../../helpers/apiHelper";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    getListSlides();
    getListArticles();
  }, []);

  const getListSlides = async () => {
    const response = await API_SERVICE.get("slides", {
      page: 1,
      page_size: 2,
      page_name: "home",
    });
    if (response?.status == "success") {
      setSlides(response?.data?.data);
    }
  };

  const getListArticles = async () => {
    const response = await API_SERVICE.get("articles", {
      page: 1,
      page_size: 3,
    });
    if (response?.status == "success") {
      setArticles(response?.data?.data);
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Trang chủ</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}

        <HeroSliderOne slides={slides} />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />

        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" articles={articles} />
      </LayoutOne>
    </Fragment>
  );
};

export default HomePage;
