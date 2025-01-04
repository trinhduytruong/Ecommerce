import apiHelper from './apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const voucherService = {
    getLists: (params) => {
        return apiHelper.get(`admin/vouchers`, {params: buildFilter(params)});
    },
    getListsGuest: (params) => {
        return apiHelper.get(`vouchers`, {params: buildFilter(params)});
    },

    add: (petData) => {
        return apiHelper.post('admin/vouchers', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/vouchers/${id}`, petData);
    },

    delete: (id) => {
        console.info("===========[delete] ===========[id] : ",id);
        return apiHelper.delete(`admin/vouchers/${id}`);
    }
};

export default voucherService;
