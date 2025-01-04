import React, { Fragment, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { MetaTags } from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Order from "../../components/order/Order";

const MyOrder = ({ location }) => {

    const pathname = location;

    return (
		<Fragment>
		<MetaTags>
			<title>Đơn hàng</title>
			<meta
				name="description"
				content="Checkout page of shop react minimalist eCommerce template."
			/>
		</MetaTags>
		<BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
		<BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
			Danh sách đơn hàng
		</BreadcrumbsItem>
		<LayoutOne headerTop="visible">
			{/* breadcrumb */}
			<Breadcrumb />
			<Order/>
		</LayoutOne>
	</Fragment>
    );
}

export default MyOrder;