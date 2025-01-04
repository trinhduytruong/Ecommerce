import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const apiOrderService = {
    add: (data) => {
        return apiHelper.post('order', data);
    },
    createOrder: (data) => {
        return apiHelper.post(`admin/order`,data);
    },
    updateOrder: (id, data) => {
        return apiHelper.put(`admin/order/${id}`,data);
    },
    getListsAdmin: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/order`,{params: buildFilter(params)});
    },
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/order`,{params: buildFilter(params)});
    },
    deleteOrder: (id) => {
        return apiHelper.delete(`user/order/${id}`);
    },
    delete: (id) => {
        return apiHelper.delete(`admin/order/${id}`);
    },
    updateOrderStatus: (id, data) => {
        return apiHelper.post(`admin/order/update-status/${id}`,data);
    }
};

export default apiOrderService;
