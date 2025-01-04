import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ImageWithFallback from "../../components/ImageWithFallback";
import { customNumber, formatTime } from "../../helpers/common";

const BlogPost = ( props ) =>
{
	const { article } = props;
	return (
		<Fragment>
			<div className="blog-details-top">
				<h3 className="mb-3">{ article?.name }</h3>
				<div className="blog-details-img">
					<Link to={ process.env.PUBLIC_URL + `/tin-tuc/${ article?.slug || article?.id }` }>
						<ImageWithFallback
							src={ article?.avatar }
							alt={ article?.name }
							defaultSrc={ article?.avatar }
						/>
					</Link>
				</div>
				<div className="blog-details-content">
					<div className="blog-meta-2">
						<ul>
							<li>{ formatTime( article?.created_at, 'HH:mm - DD/MM/yyyy' ) ?? "Chưa cập nhật" }</li>
							{/* <li>
                                <Link to={process.env.PUBLIC_URL + `/tin-tuc/${article?.slug  || article?.id}`}>
                                    4 <i className="fa fa-comments-o"/>
                                </Link>
                            </li> */}
						</ul>
					</div>
					<p className="mt-3">
						{ article.description }
					</p>
					<div className="mt-3" style={ { fontSize: "20px" } } dangerouslySetInnerHTML={ { __html: article?.content } }></div>
				</div>
			</div>
			{/* <div className="dec-img-wrapper">
                <div className="row">
                    <div className="col-md-6">
                        <div className="dec-img mb-50">
                            <img
                                alt=""
                                src={
                                    process.env.PUBLIC_URL + "/assets/img/blog/blog-details.jpg"
                                }
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="dec-img mb-50">
                            <img
                                alt=""
                                src={
                                    process.env.PUBLIC_URL + "/assets/img/blog/blog-details-2.jpg"
                                }
                            />
                        </div>
                    </div>
                </div>
                <p>{article?.content}</p>
            </div>
            <div className="tag-share">
                <div className="dec-tag">
                    <ul>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                lifestyle ,
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                interior ,
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                outdoor
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="blog-share">
                    <span>share :</span>
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
            <div className="next-previous-post">
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    {" "}
                    <i className="fa fa-angle-left"/> prev post
                </Link>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    next post <i className="fa fa-angle-right"/>
                </Link>
            </div> */}
		</Fragment>
	);
};

export default BlogPost;
