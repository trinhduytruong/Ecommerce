import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Pagination } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import OrderBreadcrumbs from '../components/order/OrderBreadcrumbs';
import apiOrderService from "../../../api/apiOrderService";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import OrderDetailsModal from '../components/order/OrderDetailsModal';
import ModelConfirmDeleteData from "../../components/model-delete/ModelConfirmDeleteData";
import NewOrderModal from '../components/order/NewOrderModal';
import { OrderSearch } from '../components/order/OrderSearch';
import { PaginationPage } from '../components/common/paginationPage';
import { buildFilter } from '../../../helpers/commonfunc';

const formatCurrency = ( value ) =>
{
	return new Intl.NumberFormat( 'vi-VN', { style: 'currency', currency: 'VND' } ).format( value );
};

const OrderManager = () =>
{
	const [ orders, setOrders ] = useState( [] );
	const [ meta, setMeta ] = useState( { total: 0, total_page: 1, page: 1, page_size: 10 } );
	const [ selectedOrder, setSelectedOrder ] = useState( null );
	const [ orderToDelete, setOrderToDelete ] = useState( null );
	const [ showDeleteModal, setShowDeleteModal ] = useState( false );
	const [ showOrderModal, setShowOrderModal ] = useState( false );
	const [ orderToUpdate, setOrderToUpdate ] = useState( null ); // State quản lý đơn hàng để cập nhật
	const [ searchParams, setSearchParams ] = useSearchParams();
	const [ params, setParams ] = useState( {} );

	// Hàm để gọi lại API và tải danh sách đơn hàng mới nhất
	const refreshOrders = async () =>
	{
		const params = Object.fromEntries( [ ...searchParams ] );
		await fetchOrdersWithParams( { ...params, page: params.page || meta?.page || 1, page_size: params.page_size || meta?.page_size || 10 } );
	};

	const fetchOrdersWithParams = async ( params ) =>
	{
		try
		{
			setParams( buildFilter(params) )
			const response = await apiOrderService.getListsAdmin( params );
			if ( response?.status == 'success' )
			{
				let data = response?.data?.data?.map( ( item ) =>
				{
					item.products = item?.transactions?.map( e => ( {
						id: e?.product?.id,
						name: e?.product?.name,
						quantity: e?.qty || 0,
						price: e?.product?.price,
						avatar: e?.product?.avatar
					} ) )
					return item;
				} )
				setOrders( data );
				setMeta( response.data.meta );
			}
		} catch ( error )
		{
			console.error( "Error fetching orders:", error );
		}
	};

	useEffect( () =>
	{
		refreshOrders();
	}, [ searchParams ] );

	const handleOrderClick = ( order ) =>
	{
		setSelectedOrder( order );
		setShowOrderModal( true );
	};

	const handleDeleteData = async () =>
	{
		try
		{
			await apiOrderService.delete( orderToDelete.id );
			await refreshOrders();
			setShowDeleteModal( false );
		} catch ( error )
		{
			console.error( "Error deleting order:", error );
		}
	};

	const handlePageChange = ( newPage ) =>
	{
		setSearchParams( { ...params, page: newPage } );
	};

	const handleUpdateOrderClick = ( order ) =>
	{
		if ( order.status !== 'completed' )
		{
			setOrderToUpdate( order ); // Mở modal ở chế độ cập nhật với order được chọn
		} else
		{
			alert( "Không thể chỉnh sửa đơn hàng đã hoàn tất." );
		}
	};

	const getVariant = ( status ) =>
	{
		switch ( status )
		{
			case 'pending':
				return 'primary';
			case 'completed':
				return 'success';
			case 'canceled':
				return 'danger';
			default:
				return 'secondary';
		}
	};

	const getVariantPayment = ( status ) =>
	{
		switch ( status )
		{
			case 'pending':
				return 'warning'; // Màu vàng
			case 'completed':
				return 'success'; // Màu xanh lá
			case 'refunding':
				return 'info'; // Màu xanh nhạt
			case 'refunded':
				return 'primary'; // Màu xanh đậm
			case 'fraud':
				return 'danger'; // Màu đỏ
			case 'failed':
				return 'dark'; // Màu xám đậm
			default:
				return 'secondary'; // Màu xám nhạt
		}
	};

	return (
		<Container>
			<Row className="gutters mt-3">
				<Col xl={ 12 }>
					<OrderBreadcrumbs />
				</Col>
			</Row>
			<Row className="gutters">
				<Col>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h2>Quản lý đơn hàng</h2>
						<Button size="sm" variant="primary" onClick={ () => setOrderToUpdate( {} ) }>
							Thêm mới <FaPlusCircle className="mx-1" />
						</Button>
					</div>
					<OrderSearch
						paging={ meta }
						params={ params }
						getListData={ setSearchParams }
					/>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Mã ĐH</th>
								<th>Khách hàng</th>
								<th>SĐT</th>
								<th>Tổng tiền</th>
								<th>Trạng thái</th>
								<th>Thanh toán</th>
								<th>Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{ orders?.length > 0 ?orders?.map( ( order, idx ) => (
								<tr key={ order.id } style={ { cursor: 'pointer' } }>
									<td onClick={ () => handleOrderClick( order ) }>{ idx + 1 }</td>
									<td onClick={ () => handleOrderClick( order ) }>{ order.code }</td>
									<td onClick={ () => handleOrderClick( order ) }>{ order.user?.name }</td>
									<td onClick={ () => handleOrderClick( order ) }>{ order.user?.phone }</td>
									<td onClick={ () => handleOrderClick( order ) }>{ formatCurrency( order.sub_total ) }</td>
									<td onClick={ () => handleOrderClick( order ) }>
										<span className={ `text-${ getVariant( order.status ) }` }>{ order.status }</span>
									</td>
									<td onClick={ () => handleOrderClick( order ) }>
										<span className={ `text-${ getVariantPayment( order.payment_status ) }` }>{ order.payment_status }</span>
									</td>
									<td>
										<Button
											size="sm"
											variant="primary"
											onClick={ () => handleUpdateOrderClick( order ) }
											title="Cập nhật"
										>
											<FaEdit />
										</Button>
										<Button
											size="sm"
											className="ms-2"
											variant="danger"
											onClick={ () =>
											{
												setOrderToDelete( order );
												setShowDeleteModal( true );
											} }
											title="Xoá"
										>
											<FaTrash />
										</Button>
									</td>
								</tr>
							) ) :<tr><td className='text-center' colSpan={8}>Không có dữ liệu</td></tr>}
						</tbody>
					</Table>
					{ meta?.total > 0 && <PaginationPage
						handlePageChange={ handlePageChange }
						meta={ meta }
					></PaginationPage> }
				</Col>
			</Row>

			<OrderDetailsModal
				show={ showOrderModal }
				onHide={ () => setShowOrderModal( false ) }
				order={ selectedOrder }
			/>

			<NewOrderModal
				show={ !!orderToUpdate }
				onHide={ () => setOrderToUpdate( null ) }
				orderToUpdate={ orderToUpdate }
				refreshOrders={ refreshOrders } // Truyền hàm callback để làm mới danh sách đơn hàng
			/>

			<ModelConfirmDeleteData
				showDeleteModal={ showDeleteModal }
				setShowDeleteModal={ setShowDeleteModal }
				handleDeleteData={ handleDeleteData }
			/>
		</Container>
	);
};

export default OrderManager;
