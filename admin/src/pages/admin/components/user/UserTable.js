import React from 'react';
import { Table, Button, Image, Badge, ButtonGroup, Dropdown } from 'react-bootstrap';
import moment from 'moment';
import { FaEdit, FaTrash, FaEye, FaListUl } from 'react-icons/fa';

const UserTable = ( { users, openUserModal, setUserToDelete, setShowDeleteModal } ) =>
{
	const defaultImage = "https://via.placeholder.com/150";
	const genStatus = (status) =>  {
		if(status == 1) {
			return <span className='text text-success'>Hoạt động</span>
		}
		return <span className='text text-danger'>Không hoạt động</span>

	}
	return (
		<Table striped bordered hover responsive className={ 'customer-table' }>
			<thead>
				<tr>
					<th>#</th>
					<th>Avatar</th>
					<th>Họ tên</th>
					<th>Email</th>
					<th>Số điện thoại</th>
					<th>Trạng thái</th>
					<th>Ngày tạo</th>
					<th>Role</th>
					<th>Thao tác</th>
				</tr>
			</thead>
			<tbody>
				{ users?.length > 0 ? users?.map( ( user, index ) => (
					<tr key={ user.id }>
						<td>{ index + 1 }</td>
						<td>
							<Image
								src={ user.avatar || defaultImage }
								alt={ user.name }
								width="60"
								height="60"
								roundedCircle
								className=""
							/>
						</td>
						<td>{ user.name }</td>
						<td>{ user.email }</td>
						<td>{ user.phone }</td>
						<td>
							{genStatus(user.status)}
						</td>
						<td>{ moment( user.dateOfBirth ).format( 'DD-MM-YYYY' ) }</td>
						<td>
							{ user.user_type }
						</td>
						<td>
							<Button
								size="sm"
								variant="primary"
								onClick={ () => openUserModal( user ) }
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
									setUserToDelete( user );
									setShowDeleteModal( true );
								} }
								title="Xoá"
							>
								<FaTrash />
							</Button>
						</td>
					</tr>
				) ) : <tr>
					<td colSpan={ 9 } className='text-center'>Không có dữ liệu</td>
				</tr> }
			</tbody>
		</Table>
	);
};

export default UserTable;
