import { Pagination } from "react-bootstrap"
import React, { useEffect, useState } from "react";

export const PaginationPage = ( props ) =>
{
	return <Pagination>
		<Pagination.First
			onClick={ () => props.getListData( { ...props.params, page: 1 } ) }
			disabled={ props.paging?.page === 1 }
		/>
		<Pagination.Prev
			onClick={ () => props.getListData( { ...props.params, page: 1 } ) }
			disabled={ props.paging?.page === 1 }
		/>
		{ Array.from( { length: props.paging.total_page }, ( _, index ) => (
			<Pagination.Item
				key={ index + 1 }
				active={ index + 1 === props.paging.page }
				onClick={ () => props.getListData( { ...props.params, page: index + 1 } ) }
			>
				{ index + 1 }
			</Pagination.Item>
		) ) }
		<Pagination.Next
			onClick={ () => props.getListData( { ...props.params, page: props.paging.page + 1 } ) }
			disabled={ props.paging.page === props.paging.total_page }
		/>
		<Pagination.Last
			onClick={ () => props.getListData( { ...props.params, page: props.paging.total_page } ) }
			disabled={ props.paging.page === props.paging.total_page }
		/>
	</Pagination>
}