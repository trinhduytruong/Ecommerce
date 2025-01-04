import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import ImageWithFallback from "../../components/ImageWithFallback";

const BlogPosts = (props) => {
    const {article} = props;
    return (
        <Fragment>
            <div className="col-lg-6 col-md-6 col-sm-12 mb-30">
                <div className="blog-wrap-2 d-flex flex-column justify-content-between h-100">
                    <div className="blog-img-2">
                        <Link to={process.env.PUBLIC_URL + `/tin-tuc/${article?.slug || article?.id}`}>
                            <ImageWithFallback
                                src={article?.avatar}
                                alt={article?.name}
                                defaultSrc="https://example.com/default-image.jpg"
                            />
                        </Link>
                    </div>
                    <div className="blog-content-2">
                        <div className="blog-meta-2">
                            <ul>
                                <li>{article?.created_at}</li>
                                <li>
                                    <Link to={process.env.PUBLIC_URL + `/tin-tuc/${article?.slug || article?.id}`}>
                                        0 <i className="fa fa-comments-o"/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <h4>
                            <Link to={process.env.PUBLIC_URL + `/tin-tuc/${article?.slug || article?.id}`}>
                                {article?.name}
                            </Link>
                        </h4>
                        <p>{article?.description}</p>
                        <div className="blog-share-comment">
                            <div className="blog-btn-2">
                                <Link to={process.env.PUBLIC_URL + `/tin-tuc/${article?.slug || article?.id}`}>
                                    Xem thêm
                                </Link>
                            </div>
                            <div className="blog-share">
                                <span>Chia sẻ :</span>
                                <div className="share-social">
                                    <ul>
                                        <li>
                                            <a className="facebook" href="//facebook.com">
                                                <i className="fa fa-facebook"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="twitter" href="//twitter.com">
                                                <i className="fa fa-twitter"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="instagram" href="//instagram.com">
                                                <i className="fa fa-instagram"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default BlogPosts;
