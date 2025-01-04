import PropTypes from "prop-types";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { StarPage } from "../../components/common/star";
import { buildImage, onErrorUser } from "../../helpers/common";

const ProductDescriptionTab = (
	{spaceBottomClass, productFullDesc, params, votes, getVotes}
) => {
    return (
        <div className={`description-review-area ${spaceBottomClass}`}>
            <div className="container">
                <div className="description-review-wrapper">
                    <Tab.Container defaultActiveKey="productDescription">
                        <Nav variant="pills" className="description-review-topbar">
                            {/* <Nav.Item>
                                <Nav.Link eventKey="additionalInfo">
                                    Additional Information
                                </Nav.Link>
                            </Nav.Item> */}
                            <Nav.Item>
                                <Nav.Link eventKey="productDescription">Thông tin sản phẩm</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="productReviews">Đánh giá{params?.total ? `(${params?.total})` : ''}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className="description-review-bottom">
                            <Tab.Pane eventKey="additionalInfo">
                                <div className="product-anotherinfo-wrapper">
                                    <ul>
                                        <li>
                                            <span>Weight</span> 400 g
                                        </li>
                                        <li>
                                            <span>Dimensions</span>10 x 10 x 15 cm{" "}
                                        </li>
                                        <li>
                                            <span>Materials</span> 60% cotton, 40% polyester
                                        </li>
                                        <li>
                                            <span>Other Info</span> American heirloom jean shorts pug
                                            seitan letterpress
                                        </li>
                                    </ul>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="productDescription">
                                {productFullDesc}
                            </Tab.Pane>
                            <Tab.Pane eventKey="productReviews">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="review-wrapper">
                                            {votes?.length > 0 ?  votes?.map((item, key) => {
												return <div key={key} className="single-review">
                                                <div className="review-img">
                                                    <img
                                                        src={buildImage(item.user?.avatar, true)}
														onError={onErrorUser}
                                                        alt=""
														style={{width: '60px', height: '60px', borderRadius: '50%'}}
                                                    />
                                                </div>
                                                <div className="review-content">
                                                    <div className="review-top-wrap">
                                                        <div className="review-left d-block">
                                                            <div className="review-name">
                                                                <h4>{item?.user?.name}</h4>
                                                            </div>
                                                            <div className="review-rating d-flex mt-1">
                                                                <StarPage fontSize={'12px'} vote_number={item?.rating}/>
                                                            </div>
                                                        </div>
                                                        {/* <div className="review-left">
                                                            <button>Reply</button>
                                                        </div> */}
                                                    </div>
                                                    <div className="review-bottom">
                                                        <p>
                                                            {item.comment}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
											}) : ''}
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>
    );
};

ProductDescriptionTab.propTypes = {
    productFullDesc: PropTypes.string,
    spaceBottomClass: PropTypes.string
};

export default ProductDescriptionTab;
