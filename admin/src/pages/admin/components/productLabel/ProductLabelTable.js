import React from 'react';
import {Table, Button, ButtonGroup, Dropdown} from 'react-bootstrap';
import {FaEdit, FaListUl, FaTrash} from "react-icons/fa";
import StatusLabel from "../../../../helpers/StatusLabel";
import moment from "moment/moment";
import { formatTime } from '../../../../helpers/formatters';

const ProductLabelTable = ({productLabels, openCategoryModal, setCategoryToDelete, setShowDeleteModal}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Status</th>
                <th>createdAt</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {productLabels?.length > 0 ? productLabels?.map((item, index) => (
                <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.slug}</td>
                    <td>{item?.description}</td>
                    <td><StatusLabel status={item?.status}/></td>
                    <td>{formatTime(item?.created_at)}</td>
                    <td>
                        <Button size="sm" variant="primary" onClick={() => openCategoryModal(item)}
                                title="Cập nhật">
                            <FaEdit/>
                        </Button>
                        <Button size="sm" className={'ms-2'} variant="danger" onClick={() => {
                            setCategoryToDelete(item);
                            setShowDeleteModal(true);
                        }} title="Xoá">
                            <FaTrash/>
                        </Button>
                    </td>
                </tr>
            )): <tr><td colSpan={7} className='text-center'>Không có dữ liệu</td></tr>}
            </tbody>
        </Table>
    );
};

export default ProductLabelTable;
