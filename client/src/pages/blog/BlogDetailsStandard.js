import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogComment from "../../wrappers/blog/BlogComment";
import BlogPost from "../../wrappers/blog/BlogPost";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { API_SERVICE, get } from "../../helpers/apiHelper";
import { INIT_PAGING } from "../../helpers/constant";
import { useDispatch } from "react-redux";
import { buildFilter } from "../../helpers/common";

const BlogDetailsStandard = ({ location }) => {
  const { pathname } = location;
  const { slug } = useParams();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getDetail();
  }, [slug]);

  const getDetail = async () => {
    let url = `articles/`;
    if (!isNaN(slug)) {
      url += slug;
    } else {
      url += `slug/${slug}`;
    }
    const response = await API_SERVICE.get(url);
    if (response?.status == "success") {
      setArticle(response?.data?.data);
    }
  };

  const [menus, setMenus] = useState([]);
  const [tags, setTags] = useState([]);
  const [params, setParams] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const getListData = (filters) => {
    let search = new URLSearchParams(buildFilter(filters));
    console.log(search);
    history.push(`/tin-tuc?${search?.toString()}`);
  };

  const getListMenus = async (filters) => {
    let param = {
      ...filters,
    };
    const res = await API_SERVICE.get("menus", param);

    if (res?.status == "success") {
      let result =
        res?.data?.data?.map((item) => {
          return item;
        }) || [];
      setMenus(result);
    }
  };

  const getListTags = async (filters) => {
    let param = {
      ...filters,
    };
    const res = await API_SERVICE.get("tags", param);
    if (res?.status == "success") {
      let result =
        res?.data?.data?.map((item) => {
          return item;
        }) || [];
      setTags(result);
    }
  };

  useEffect(() => {
    getListMenus({ ...INIT_PAGING, page_size: 1000 });
    getListTags({ ...INIT_PAGING, page_size: 1000 });
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Chi tiết | Blog Post</title>
        <meta
          name="description"
          content="Blog post page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        HOME
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {article?.name}
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-9">
                <div className="blog-details-wrapper ml-20">
                  <BlogPost article={article} />
                  {/* <BlogComment/> */}
                </div>
              </div>
              <div className="col-lg-3">
                <BlogSidebar
                  getListData={getListData}
                  params={params}
                  menus={menus}
                  tags={tags}
                />
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

BlogDetailsStandard.propTypes = {
  location: PropTypes.object,
};

export default BlogDetailsStandard;
