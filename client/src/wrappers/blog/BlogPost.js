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
					<p className="mt-3" style={ { fontSize: "20px" } }>
						{ article.description }
					</p>
					<div className="mt-3" dangerouslySetInnerHTML={ { __html: article?.content } }></div>
				</div>
			</div>
		</Fragment>
	);
};

export default BlogPost;
