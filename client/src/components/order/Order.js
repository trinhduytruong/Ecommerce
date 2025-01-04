import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Form, Modal, Pagination, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import { INIT_PAGING, ORDER_STATUS, PAYMENT_STATUS } from "../../helpers/constant";
import { API_SERVICE } from "../../helpers/apiHelper";
import { buildImage, checkValidate, customNumber, onErrorImage } from "../../helpers/common";
import { useToasts } from "react-toast-notifications";
import { formatCurrencyVND } from "../../helpers/product";
import { PaginationPage } from "../common/paging";
import { StarPage } from "../common/star";
import { Link } from 'react-router-dom';

const FORM = {
	comment: { value: "", name: "Bình luận", rules: { required: true } },
	rating: { value: 0, name: "Điểm đánh giá" },
	product_id: { value: 0, name: "Sản phẩm" },
}
const Order = ( props ) =>
{

	const dispatch = useDispatch();
	const [ orders, setOrders ] = useState( [] );
	const [ code, setCode ] = useState( null );

	const { addToast } = useToasts();

	const [ item, setItem ] = useState( null );
	const [ title, setTitle ] = useState( null );
	const [ showModal, setShowModal ] = useState( false );
	const [ showModalVote, setShowModalVote ] = useState( false );
	const [ formVote, setFormVote ] = useState( { ...FORM } );
	const [ errorVote, setErrorVote ] = useState( null );



	// const { confirm } = Modal;
	const [ paging, setPaging ] = useState( {
		...INIT_PAGING
	} );

	let user_id = localStorage.getItem( 'id' )

	useEffect( () =>
	{
		getOrders( paging );
	}, [] );

	const getOrders = async ( params ) =>
	{
		let eventKey = 0;
		dispatch( toggleShowLoading( true ) );
		let response = await API_SERVICE.get( 'users/orders', { ...params, code: code } );
		console.log("response", response);

		if ( response?.status == 'success' && response?.data )
		{
			const newData = response.data?.data?.map( item =>
			{
				item.eventKey = eventKey;
				eventKey++;
				return item;
			} )
			setOrders( newData );
			setPaging( response?.data?.meta );
			dispatch( toggleShowLoading( false ) );
		}
		dispatch( toggleShowLoading( false ) );
	};

	const genStatus = ( data, status ) =>
	{
		let result = data?.find( item => item?.value == status );
		return <p className={ " mb-0 " + result?.className || 'text-warning' }>{ result?.name || 'Chờ duyệt' }</p>;
	}


	const cancelOrder = ( item ) =>
	{
		handleShow( item, `Bạn có chắc muốn hủy đơn hàng này không?` )
		// confirm( {
		// 	title: <p className="text-center">
		// 		<b>Bạn có chắc muốn hủy đơn hàng này không?</b>
		// 	</p>,
		// 	centered: true,
		// 	type: 'confirm',
		// 	okText: 'Đồng ý',
		// 	cancelText: 'Hủy',
		// 	// okButtonProps: <Button>Đồng ý</Button>,
		// 	onOk ()
		// 	{
		// 		updateStatus( item.id, { status: 4 } )
		// 	},
		// 	onCancel ()
		// 	{
		// 		console.log( 'Cancel' );
		// 	},
		// } );
	}

	const updateStatus = async ( id, data ) =>
	{
		dispatch( toggleShowLoading( true ) );
		const response = await API_SERVICE.put( 'users/orders/' + id, data );
		if ( response?.status === "success" )
		{
			addToast( "Hủy đơn hàng thành công", { appearance: 'success', autoDismiss: true, } );
			handleClose();
			await getOrders( INIT_PAGING );
		} else
		{
			addToast( response?.message, { appearance: 'error', autoDismiss: true, } )
			dispatch( toggleShowLoading( false ) );
		}
	}

	const handleClose = () =>
	{
		setTitle( null );
		setItem( null );
		setShowModal( false );
		setShowModalVote( false );
		setFormVote( { ...FORM } );
		setErrorVote( null );;
	};
	const handleShow = ( item, titleData ) =>
	{
		setTitle( titleData );
		setItem( item );
		setShowModal( true );
	};

	const voteProduct = async ( e ) =>
	{
		e.preventDefault();
		let errorData = checkValidate( formVote );
		if ( errorData )
		{
			console.log( "errorData login-----> ", errorData, formVote );
			setErrorVote( { ...errorData } )
			return;
		}
		let body = Object.keys( formVote ).reduce( ( newItem, key ) =>
		{
			newItem[ key ] = formVote[ key ]?.value;
			return newItem;
		}, {} )
		dispatch( toggleShowLoading( true ) );
		const response = await API_SERVICE.post( 'users/votes', body );
		if ( response?.status === "success" )
		{
			addToast( "Đánh giá thành công", {
				appearance: 'success',
				autoDismiss: true,

			} );
			handleClose();
		} else
		{
			addToast( response?.message, { appearance: 'error', autoDismiss: true, } )
			dispatch( toggleShowLoading( false ) );
		}
	}


	return (
		<div className="myaccount-area pb-80 pt-100">
			<div className="container">
				<div className="row">
					<div className="ml-auto mr-auto col-lg-9">
						<div className="myaccount-wrapper">
							<div className=" w-50 mx-auto mb-2 d-flex form-group mb-4">
								<input className="form-control" type="text" placeholder="Nhập mã đơn hàng" onChange={ e => setCode( e?.target?.value ) } />
								<button className="btn ml-2 text-nowrap btn-xl btn-success"
									onClick={ e =>
									{
										getOrders( { page: 1, page_size: 20, code: code } )
									} }>Tìm kiếm</button>
							</div>
							<Accordion>
								{ orders.length > 0 ?
									orders?.map( ( item, key1 ) => (
										<div key={ key1 }>
											<Card className="single-my-account mb-20">
												<Card.Header className="panel-heading">
													<Accordion.Toggle variant="link" eventKey={ String( item.eventKey ) }>
														<h3 className="panel-title">
															<div className="row">
																<div className="col-sm-6">
																	Đơn hàng <b className="ml-2">#{ item.code || item.id }</b>
																</div>
																<div className="col-sm-3 text-right">
																	{ formatCurrencyVND( item.sub_total ) }
																</div>
																<div className="col-sm-3 text-right">
																	{ genStatus( ORDER_STATUS, item.status ) }
																</div>
															</div>
														</h3>
													</Accordion.Toggle>
												</Card.Header>
												<Accordion.Collapse eventKey={ String( item.eventKey ) }>
													<Card.Body>
														<div className="myaccount-info-wrapper">
															<div className="mb-5 d-flex justify-content-between align-items-start">
																{ item?.user ? <div>
																	<h4>Người nhận: { item.user?.name }</h4>
																	<p className="mb-0"><span style={ { fontWeight: 600 } }>SĐT: </span>{ item?.user?.phone ? item?.user?.phone : ''  }</p>
																	<p className="mb-0"><span style={ { fontWeight: 600 } }>Địa chỉ: </span>{ item?.address ? item?.address : 'N/A' }</p>
																	<p><span style={ { fontWeight: 600 } }>Email: </span>{ item.user?.email }</p>

																</div> : '' }
																{
																	item?.status === 'pending' && <button className="btn btn-danger" onClick={ () =>
																	{
																		cancelOrder( item );
																	} }>Hủy đơn hàng</button>
																}
															</div>
															<div className="text-center">
																<h4>Sản phẩm</h4>
															</div>
															<Table className={ `table-striped table-hover mb-5` } responsive>
																<thead>
																	<tr>
																		<th>#</th>
																		<th className="text-nowrap">Tên sản phẩm</th>
																		<th className="text-nowrap">Số lượng</th>
																		<th className="text-nowrap">Giá</th>
																		<th className="text-nowrap">Tổng giá</th>
																		{ item?.status == 'completed' && <th className="text-nowrap"></th> }
																	</tr>
																</thead>
																<tbody>
																	{ item.transactions?.length > 0 &&
																		item.transactions?.map( ( product, key2 ) => (
																			<tr key={ key2 }>
																				<td className="align-middle">
																					{ key2 + 1 }
																				</td>
																				<td className="align-middle">
																					<Link className="d-flex align-items-center "
																					to={ product?.product?.slug ? '/sp/' + product?.product?.slug : '/san-pham' + product?.product?.id }>
																						<img alt={ product?.product?.name }
																							src={ buildImage( product?.product?.avatar ) }
																							onError={ onErrorImage } style={ { width: '90px', height: '90px' } }
																							width={ 90 } height={ 90 }
																							className="mr-1" />
																						<p className="mb-0">{ product?.product?.name }</p>
																					</Link>
																				</td>
																				<td className="align-middle">{ product.qty }</td>
																				<td className="align-middle">{ customNumber( product.price ) }</td>
																				<td className="align-middle">{ customNumber( product.total_price * product.qty ) }</td>
																				{ item?.status == 'completed' && <th className="text-nowrap align-middle">
																					<button className="btn btn-primary" onClick={ () =>
																					{
																						setShowModalVote( true );
																						setFormVote( { ...formVote, product_id: { ...formVote.product_id, value: product.product?.id } } );
																						setItem( product )
																					} }> Đánh giá</button>
																				</th> }

																			</tr>
																		) )
																	}
																</tbody>
															</Table>
															<div className="border-top pt-md-3">
																<div className="row mb-md-3">
																	<div className="col-sm-9">
																		<span style={ { fontWeight: 600, fontSize: 16 } }>Giảm giá:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		<span style={ { fontWeight: 600, fontSize: 16 } }>{ customNumber( item.discount_amount || 0 ) || 0 }</span>
																	</div>
																</div>
																<div className="row mb-md-3">
																	<div className="col-sm-9">
																		<span style={ { fontWeight: 600, fontSize: 16 } }>Chi phí vận chuyển:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		<span style={ { fontWeight: 600, fontSize: 16 } }>{ customNumber( item.shipping_amount ) || 0 }</span>
																	</div>
																</div>
																<div className="row mb-md-3">
																	<div className="col-sm-9">
																		<span style={ { fontWeight: 600, fontSize: 16 } }>Thuế:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		<span style={ { fontWeight: 600, fontSize: 16 } }>{ customNumber( item.tax_amount ) || 0 }</span>
																	</div>
																</div>
																<div className="row mb-md-3 pt-md-3">
																	<div className="col-sm-9">
																		<span style={ { fontWeight: 600, fontSize: 18, color: 'red' } }>Tổng giá:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		<span style={ { fontWeight: 600, fontSize: 18, color: 'red' } }>{ customNumber( item.sub_total ) }</span>
																	</div>
																</div>
																{/* <div className="row mb-md-3 pt-md-3">
																	<div className="col-sm-9">
																		<span style={ { fontWeight: 600, fontSize: 18 } }>Thuế:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		{ genPaymentType( item.payment_type ) }
																	</div>
																</div> */}
																<div className="row mb-md-3 pt-md-3">
																	<div className="col-sm-9">
																		<span style={ { fontWeight: 600, fontSize: 18 } }>Trạng thái thanh toán:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		{ genStatus( PAYMENT_STATUS, item.payment_status ) }
																	</div>
																</div>
																{/* <div className="row mb-md-3 pt-md-3">
																	<div className="col-sm-9">
																		<span style={ { fontWeight: 600, fontSize: 18 } }>Trạng thái giao hàng:</span>
																	</div>
																	<div className="col-sm-3 text-right">
																		{ genShippingStatus( item.shipping_status ) }
																	</div>
																</div> */}
															</div>
														</div>
													</Card.Body>
												</Accordion.Collapse>
											</Card>
										</div>
									) )
									:
									<div className="text-center">
										Không có thông tin đơn hàng.
									</div>
								}
							</Accordion>


						</div>
					</div>
				</div>
				{
					paging.total > 0 &&
					<div className="mx-auto d-flex justify-content-center my-4">
						<PaginationPage
							getListData={ getOrders }
							paging={ paging }
							params={ { ...paging, code } }
						/>
					</div>
				}
			</div>

			<Modal
				show={ showModal }
				onHide={ handleClose }
				// centered={true}
				size={ "sm" }
			>

				<Modal.Body>
					<p className="text-center mb-2" style={ { fontSize: '18px' } }>{ title }</p>
				</Modal.Body>
				<Modal.Footer className="justify-content-center">
					<Button variant="secondary" onClick={ handleClose }>
						Hủy
					</Button>
					<Button variant="primary" onClick={ () =>
					{
						updateStatus( item.id, { status: 'canceled', products: [] } )
					} }>Đồng ý</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				show={ showModalVote }
				onHide={ handleClose }
				size={ "sm" }
			>
				<Modal.Header>
					Đánh giá sản phẩm
				</Modal.Header>
				<Modal.Body>
					<p className="text-center" style={ { fontSize: '18px' } }>{ item?.product?.name }</p>
					<Form>
						<div className="text-center d-flex justify-content-center">
							<StarPage vote_number={ formVote.rating.value } setVoteNumber={ ( e ) =>
							{
								setFormVote( { ...formVote, rating: { ...formVote.rating, value: e } } )
							} } is_form={ true } />
						</div>
						<Form.Group controlId="formEmail">
							<Form.Label>Bình luận</Form.Label>
							<Form.Control
								type="text"
								as={ 'textarea' }
								rows={ 5 }
								placeholder="Nhập bình luận"
								className="mb-1"
								value={ formVote?.comment?.value }
								onChange={ ( e ) =>
								{
									setFormVote( { ...formVote, comment: { ...formVote.comment, value: e?.target?.value } } );
									setErrorVote( { ...errorVote, comment: null } )
								} }
								isInvalid={ !!errorVote?.comment }
							/>
							{ errorVote?.comment && <span className="text-danger">{ errorVote?.comment }</span> }
						</Form.Group>

					</Form>
				</Modal.Body>
				<Modal.Footer className="justify-content-center">
					<Button variant="secondary" onClick={ handleClose }>
						Hủy
					</Button>
					<Button variant="primary" onClick={ ( e ) =>
					{
						voteProduct( e )
					} }>Đánh giá</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Order;