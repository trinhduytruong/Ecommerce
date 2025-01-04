import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import
{
	getIndividualCategories,
	getIndividualTags,
	getIndividualColors,
	getProductsIndividualSizes
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopTag";
import { API_SERVICE, get } from "../../helpers/apiHelper";

const ShopSidebar = ( { products, getSortParams, sideSpaceClass, params } ) =>
{
	const uniqueCategories = getIndividualCategories( products );
	const uniqueColors = getIndividualColors( products );
	const uniqueSizes = getProductsIndividualSizes( products );
	const uniqueTags = getIndividualTags( products );

	const [ categories, setCategories ] = useState( [] );
	const [ brands, setBrands ] = useState( [] );

	useEffect( () =>
	{
		getCategories( { page: 1, page_size: 1000 } );
		getBrands( { page: 1, page_size: 1000 } );
	}, [] );

	const getCategories = async ( param ) =>
	{
		const res = await API_SERVICE.get( 'categories', param );
		if ( res?.status == 'success' )
		{
			setCategories( res?.data?.data ); // Gán dữ liệu vào state
		}
	}

	const getBrands = async ( param ) =>
	{
		const res = await API_SERVICE.get( 'brands', param );
		if ( res?.status == 'success' )
		{
			setBrands( res?.data?.data ); // Gán dữ liệu vào state
		}
	}



	return (
		<div className={ `sidebar-style ${ sideSpaceClass ? sideSpaceClass : "" }` }>
			{/* shop search */ }
			<ShopSearch
				getSortParams={ getSortParams }
				params={ params }
			/>

			{/* filter by categories */ }
			<ShopCategories
				categories={ categories }
				title={'Danh mục'}
				classKey={ 'category' }
				key_param={'category_id'}
				getSortParams={ getSortParams }
			/>

			<ShopCategories
				categories={ brands }
				title={'Nhãn hàng'}
				classKey={ 'brand' }
				
				key_param={'brand_id'}

				getSortParams={ getSortParams }
			/>

			{/* filter by color */ }
			{/*<ShopColor colors={uniqueColors} getSortParams={getSortParams}/>*/ }

			{/* filter by size */ }
			{/*<ShopSize sizes={uniqueSizes} getSortParams={getSortParams}/>*/ }

			{/* filter by tag */ }
			{/*<ShopTag tags={uniqueTags} getSortParams={getSortParams}/>*/ }
		</div>
	);
};

ShopSidebar.propTypes = {
	getSortParams: PropTypes.func,
	products: PropTypes.array,
	sideSpaceClass: PropTypes.string
};

export default ShopSidebar;
