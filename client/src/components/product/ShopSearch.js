import React, { useEffect, useState } from "react";

const ShopSearch = ( props ) =>
{
	const [ name, setName ] = useState( "" );

	useEffect(() => {
		if(props.params?.name) {
			setName(props.params?.name)
		}
	}, [props.params])
	return (
		<div className="sidebar-widget">
			<h4 className="pro-sidebar-title">Tìm kiếm</h4>
			<div className="pro-sidebar-search mb-50 mt-25">
				<div className="pro-sidebar-search-form">
					<input type="text" value={name} onChange={(e) => setName(e?.target?.value)} placeholder="Tìm kiếm tại đây..." />
					<button onClick={(e) => {props.getSortParams("name", name)}}>
						<i className="pe-7s-search" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShopSearch;
