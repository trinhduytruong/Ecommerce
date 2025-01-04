import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import { API_SERVICE, get } from "../../helpers/apiHelper";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import { INIT_PAGING } from "../../helpers/constant";

import { useLocation } from "react-router-dom";
import { PaginationPage } from "../../components/common/paging";

const BlogPage = ({ location }) => {
  const { pathname } = location;
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [tags, setTags] = useState([]);
  const [params, setParams] = useState({});
  const [paging, setPaging] = useState({ ...INIT_PAGING });
  const dispatch = useDispatch();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const menu_id = queryParams.get("menu_id");
  const tag_ids = queryParams.get("tag_ids");
  const name = queryParams.get("name");

  const getListData = async (filters) => {
    let param = {
      ...filters,
    };
    setParams(param);

    console.log("filter-----> ", filters);
    dispatch(toggleShowLoading(true));
    const res = await API_SERVICE.get("articles", param);

    dispatch(toggleShowLoading(false));
    if (res?.status == "success") {
      let result =
        res?.data?.data?.map((item) => {
          return item;
        }) || [];
      setArticles(result);
      setPaging(res?.data?.meta);
    }
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
    console.log(queryParams, search, name, menu_id, tag_ids);
    getListData({ ...paging });
    getListMenus({ ...INIT_PAGING, page_size: 1000 });
    getListTags({ ...INIT_PAGING, page_size: 1000 });
  }, [menu_id, tag_ids, name]);
  return (
    <Fragment>
      <MetaTags>
        <title>Bài viết</title>
        <meta
          name="description"
          content="Blog of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Bài viết
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-9">
                <div className="ml-20">
                  <div className="row">
                    {articles &&
                      articles?.map((article, key) => {
                        return <BlogPosts article={article} key={key} />;
                      })}
                  </div>
                  {paging.total > 0 && (
                    <div className="mx-auto d-flex justify-content-center my-4">
                      <PaginationPage
                        getListData={getListData}
                        paging={paging}
                        params={{ ...paging, ...params }}
                      />
                    </div>
                  )}

                  {/* blog pagination */}
                  {/* <BlogPagination getListData={getListData} params={params}/> */}
                </div>
              </div>
              <div className="col-lg-3">
                {/* blog sidebar */}
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

BlogPage.propTypes = {
  location: PropTypes.object,
};

export default BlogPage;
