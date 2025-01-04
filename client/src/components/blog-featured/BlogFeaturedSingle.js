import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";
import ImageWithFallback from "../ImageWithFallback";

const BlogFeaturedSingle = ({singlePost}) => {
    return (
        <div className="col-lg-4 col-sm-6">
            <div className="blog-wrap mb-30 scroll-zoom">
                <div className="blog-img">
                    <Link to={process.env.PUBLIC_URL + `/tin-tuc/${singlePost?.slug}`}>
                        <ImageWithFallback
                            src={singlePost?.avatar}
                            alt={singlePost?.name}
                            defaultSrc="/assets/img/blog/blog-details-2.jpg"
                        />
                    </Link>
                    <div className="blog-category-names">
                        {/*{singlePost.category?.map((singleCategory, key) => {*/}
                        {/*    return (*/}
                        {/*        <span className="purple" key={key}>*/}
                        {/*          {singleCategory}*/}
                        {/*        </span>*/}
                        {/*    );*/}
                        {/*})}*/}
                        <span className="purple">{singlePost?.menu?.name}</span>
                    </div>
                </div>
                <div className="blog-content-wrap">
                    <div className="blog-content text-center">
                        <h3>
                            <Link to={process.env.PUBLIC_URL + `/tin-tuc/${singlePost?.slug}`}>
                                {singlePost.name}
                            </Link>
                        </h3>
                        <span>
                            By{" "} Admin
                          {/*  <Link to={process.env.PUBLIC_URL + singlePost.authorUrl}>*/}
                          {/*      {singlePost.author}*/}
                          {/*</Link>*/}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

BlogFeaturedSingle.propTypes = {
    singlePost: PropTypes.object
};

export default BlogFeaturedSingle;
