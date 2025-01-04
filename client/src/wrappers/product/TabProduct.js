import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";
import { API_SERVICE, get } from "../../helpers/apiHelper";

const TabProduct = ( {
	spaceTopClass,
	spaceBottomClass,
	bgColorClass,
	category
} ) =>
{

	const [ productLabels, setProductLabels ] = useState( [] );
	const [ products, setProducts ] = useState( [] );
	const [ selectedLabelId, setSelectedLabelId ] = useState( null );

	useEffect( () =>
	{
		get( 'product-labels' )
			.then( ( res ) =>
			{
				const labels = res?.data?.data;
				setProductLabels( labels );
				if ( labels?.length > 0 )
				{
					setSelectedLabelId( labels[ 0 ].id );
					getListsProducts( labels[ 0 ].id );
				}
			} )
			.catch( ( err ) => console.error( 'Failed to fetch data:', err ) );

	}, [] );

	const getListsProducts = async ( labelId ) =>
	{
		const res = await API_SERVICE.get( 'products', { product_labels: `${ labelId || '' }`, page_size: 4 } )
		if ( res?.status == "success" )
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
			} )
			setProducts( productData ); // Gán dữ liệu vào state
		}
	}

	const handleSelectTab = ( labelId ) =>
	{
		setSelectedLabelId( labelId );
		getListsProducts( labelId );
	};

	return (
		<div
			className={ `product-area ${ spaceTopClass ? spaceTopClass : "" } ${ spaceBottomClass ? spaceBottomClass : ""
				} ${ bgColorClass ? bgColorClass : "" }` }
		>
			<div className="container">
				<SectionTitle titleText="DAILY DEALS!" positionClass="text-center" />
				<Tab.Container activeKey={ selectedLabelId }>
					<Nav
						variant="pills"
						className="product-tab-list pt-30 pb-55 text-center"
					>
						{ productLabels && productLabels?.map( ( label, key ) => (
							<Nav.Item key={ key }>
								<Nav.Link eventKey={ label.id } onClick={ () => handleSelectTab( label.id ) }>
									<h4>{ label.description }</h4>
								</Nav.Link>
							</Nav.Item>
						) ) }
					</Nav>
					<Tab.Content>
						{ products && (
							<Tab.Pane eventKey={ selectedLabelId }>
								<div className="row">
									<ProductGrid
										category={ category }
										type="new"
										products={ products }
										limit={ 8 }
										spaceBottomClass="mb-25"
									/>
								</div>
							</Tab.Pane>
						) }
					</Tab.Content>
				</Tab.Container>
			</div>
		</div>
	);
};

TabProduct.propTypes = {
	bgColorClass: PropTypes.string,
	category: PropTypes.string,
	spaceBottomClass: PropTypes.string,
	spaceTopClass: PropTypes.string
};

export default TabProduct;
