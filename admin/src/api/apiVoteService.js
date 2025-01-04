import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const apiVoteService = {
    add: (data) => {
        return apiHelper.post('user/vote', data);
    },
    createOrder: (data) => {
        return apiHelper.post(`admin/vote`,data);
    },
    updateOrder: (id, data) => {
        return apiHelper.put(`admin/vote/${id}`,data);
    },
    getListsAdmin: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/vote`,{params: buildFilter(params)});
    },
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/vote`,{params: buildFilter(params)});
    },
    delete: (id) => {
        return apiHelper.delete(`admin/vote/${id}`);
    },
};

export default apiVoteService;
