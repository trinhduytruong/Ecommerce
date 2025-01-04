import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import { get } from "../../helpers/apiHelper";
import { useParams } from "react-router-dom";

const BlogTag = ({ location }) => {
  const { pathname } = location;
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [tag, setTag] = useState(null);
  useEffect(() => {
    get(`tags/slug/${slug}`)
      .then((res) => {
        console.log("API response:", res);
        setTag(res?.data?.data);
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, [slug]);

  useEffect(() => {
    if (tag) {
      get(`articles?tag_ids=${tag.id}`)
        .then((res) => {
          console.log("API response:", res);
          setArticles(res?.data?.data);
        })
        .catch((err) => console.error("Failed to fetch data:", err));
    }
  }, [slug]);
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
        Blog
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

                  {/* blog pagination */}
                  <BlogPagination />
                </div>
              </div>
              <div className="col-lg-3">
                {/* blog sidebar */}
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

BlogTag.propTypes = {
  location: PropTypes.object,
};

export default BlogTag;
