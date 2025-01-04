import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect, useDispatch } from 'react-redux';
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import { API_SERVICE, get } from "../../helpers/apiHelper";
import { toggleShowLoading } from "../../redux/actions/common";
import { INIT_PAGING } from "../../helpers/constant";
import { PaginationPage } from "../../components/common/paging";

const ShopGridStandard = ( { location } ) =>
{
	const [ layout, setLayout ] = useState( 'grid three-column' );
	const [ sortType, setSortType ] = useState( '' );
	const [ sortValue, setSortValue ] = useState( '' );
	const [ filterSortType, setFilterSortType ] = useState( '' );
	const [ filterSortValue, setFilterSortValue ] = useState( '' );
	const [ offset, setOffset ] = useState( 0 );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ currentData, setCurrentData ] = useState( [] );
	const [ sortedProducts, setSortedProducts ] = useState( [] );

	const [ products, setProducts ] = useState( [] );
	const [ params, setParams ] = useState( {} );
	const [ paging, setPaging ] = useState( { ...INIT_PAGING } );

	const pageLimit = 15;
	const { pathname } = location;

	const dispatch = useDispatch();

	const getLayout = ( layout ) =>
	{
		setLayout( layout )
	}

	const getSortParams = ( sortType, sortValue ) =>
	{
		let paramsFilter = { ...params, page: 1 };
		if ( sortType )
		{
			paramsFilter[ sortType ] = sortValue;
		}
		getListData( paramsFilter )
	}

	const getFilterSortParams = ( sortType, sortValue ) =>
	{
		let paramsFilter = { ...params, page: 1 };
		if ( sortType &&  sortValue)
		{
			paramsFilter[ "sort" ] = `${sortType}:${sortValue}`;
		} else {
			paramsFilter[ "sort" ] = null;

		}
		getListData( paramsFilter )
	}

	// useEffect( () =>
	// {
	// 	let sortedProducts = getSortedProducts( products, sortType, sortValue );
	// 	const filterSortedProducts = getSortedProducts( sortedProducts, filterSortType, filterSortValue );
	// 	sortedProducts = filterSortedProducts;
	// 	setSortedProducts( sortedProducts );
	// 	setCurrentData( sortedProducts.slice( offset, offset + pageLimit ) );
	// }, [ offset, products, filterSortType, filterSortValue ] );



	const getListData = async ( filters ) =>
	{
		let param = {
			...paging,
			...filters
		}
		if ( !filters?.category_id )
		{
			if ( sortType )
			{
				param[ sortType ] = sortValue
			}
		}
		setParams( param )
		dispatch( toggleShowLoading( true ) );
		const res = await API_SERVICE.get( 'products', param );

		dispatch( toggleShowLoading( false ) );
		if ( res?.status == 'success' )
		{
			let productData = res?.data?.data?.map( ( item ) =>
			{
				if ( item.image?.length > 0 )
				{
					item.image.push( item.avatar )
				} else
				{
					item.image = [ item.avatar ]
				}
				return item;
			} ) || [];
			setProducts( productData ); //
			setPaging( res?.data?.meta )
		}

	}
	useEffect( () =>
	{
		getListData();
	}, [] );


	return (
		<Fragment>
			<MetaTags>
				<title>Sản phẩm</title>
				<meta name="description" content="Shop page of flone react minimalist eCommerce template." />
			</MetaTags>

			<BreadcrumbsItem to={ process.env.PUBLIC_URL + '/' }>Home</BreadcrumbsItem>
			<BreadcrumbsItem to={ process.env.PUBLIC_URL + pathname }>Cửa hàng</BreadcrumbsItem>

			<LayoutOne headerTop="visible">
				{/* breadcrumb */ }
				<Breadcrumb />

				<div className="shop-area pt-95 pb-100">
					<div className="container">
						<div className="row">
							<div className="col-lg-3 order-2 order-lg-1">
								{/* shop sidebar */ }
								<ShopSidebar products={ products }
									getSortParams={ getSortParams }
									params={ params }
									sideSpaceClass="mr-30" />
							</div>
							<div className="col-lg-9 order-1 order-lg-2">
								{/* shop topbar default */ }
								<ShopTopbar getLayout={ getLayout }
								getFilterSortParams={ getFilterSortParams }
								productCount={ paging?.total }
								getSortParams={ getSortParams }
								params={ params }
								sortedProductCount={ products?.length } />

								{/* shop page content default */ }
								<ShopProducts layout={ layout } products={ products } />

								{/* shop product pagination */ }
								<div className="pro-pagination-style text-center mt-30">
									{
										paging.total > 0 &&
										<div className="mx-auto d-flex justify-content-center my-4">
											<PaginationPage
												getListData={ getListData }
												paging={ paging }
												params={ { ...paging, ...params } }
											/>
										</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</LayoutOne>
		</Fragment>
	)
}

ShopGridStandard.propTypes = {
	location: PropTypes.object,
	products: PropTypes.array
}

const mapStateToProps = state =>
{
	return {
		products: state.productData.products
	}
}

export default connect( mapStateToProps )( ShopGridStandard );
