import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import {get} from "../../helpers/apiHelper";
import {useParams} from "react-router-dom";

const BlogStandardMenu = ({location}) => {
    const {pathname} = location;
    const { slug } = useParams();
    const [articles, setArticles] = useState([]);
    const [menu, setMenu] = useState(null);
    useEffect(() => {
        get(`menus/slug/${slug}`)
            .then((res) => {
                console.log('API response:', res);
                setMenu(res?.data?.data);
            })
            .catch((err) => console.error('Failed to fetch data:', err));

    }, [slug]);

    useEffect(() => {
        if(menu)
        {
            get(`articles?menu_id=${menu.id}`)
                .then((res) => {
                    console.log('API response:', res);
                    setArticles(res?.data?.data);
                })
                .catch((err) => console.error('Failed to fetch data:', err));
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
                <Breadcrumb/>
                <div className="blog-area pt-100 pb-100">
                    <div className="container">
                        <div className="row flex-row-reverse">
                            <div className="col-lg-9">
                                <div className="ml-20">
                                    <div className="row">
                                        {articles &&
                                            articles?.map((article, key) => {
                                                return (
                                                    <BlogPosts article={article} key={key}/>
                                                )
                                            })}
                                    </div>

                                    {/* blog pagination */}
                                    <BlogPagination/>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                {/* blog sidebar */}
                                <BlogSidebar/>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

BlogStandardMenu.propTypes = {
    location: PropTypes.object
};

export default BlogStandardMenu;
