import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {connect} from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import {useParams} from "react-router-dom";
import {API_SERVICE, get} from "../../helpers/apiHelper";
import { INIT_PAGING } from "../../helpers/constant";

const Product = ({location}) => {
    const {pathname} = location;
    const { id, slug } = useParams();
    const [product, setProduct] = useState(null);
    console.info("[slug] : ",slug, id);

	const [votes, setVotes] = useState([]);
	const [pagingVote, setPagingVote] = useState({
		...INIT_PAGING, product_id: null
	});

    useEffect(() => {
        if(slug) {
			get(`products/slug/${slug}`)
            .then((res) => {
                console.info("data: ",res?.data?.data);
                setProduct(res?.data?.data);
				if(res?.data?.data) {
					getVotes({...pagingVote, product_id: res?.data?.data?.id})
				}
            })
            .catch((err) => console.error('Failed to fetch data:', err));
		}

    }, [slug]);

	useEffect(() => {
        if(id) {
			console.log(id);
			get(`products/${id}`)
            .then((res) => {
				let productData = {
					...res?.data?.data,}
				let images = [productData?.avatar];
				if(productData) {
					productData = {...productData, image: images};
					getVotes({...pagingVote, product_id: id})
				}
                setProduct(productData);

            })
            .catch((err) => console.error('Failed to fetch data:', err));
		}

    }, [id]);

	const getVotes = async(filters) => {
		const response = await API_SERVICE.get('votes', filters);
		if(response?.status == 'success') {
			setVotes(response?.data?.data);
			setPagingVote({...pagingVote, ...response?.data?.meta});
		}
	}

    return (
        <Fragment>
            <MetaTags>
                <title>{product?.name}</title>
                <meta
                    name="description"
                    content="Product page of flone react minimalist eCommerce template."
                />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                {product?.name}
            </BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb/>

                {/* product description with image */}
                {product && (
                    <ProductImageDescription
                        spaceTopClass="pt-100"
                        spaceBottomClass="pb-100"
                        product={product}
                    />
                )}

                {/* product description tab */}
                <ProductDescriptionTab
                    spaceBottomClass="pb-90"
					votes={votes}
					getVotes={getVotes}
					params={pagingVote}
                    productFullDesc={product?.description}
                />
            </LayoutOne>
        </Fragment>
    );
};

Product.propTypes = {
    location: PropTypes.object,
    product: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    const itemId = ownProps.match.params.id;
    return {
        product: state.productData.products?.filter(
            single => single.id === itemId
        )[0]
    };
};

export default connect(mapStateToProps)(Product);
