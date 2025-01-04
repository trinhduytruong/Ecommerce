import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const brandService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/brands`,{params: buildFilter(params)});
    },

    add: (petData) => {
        return apiHelper.post('admin/brands', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/brands/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/brands/${id}`);
    },
};

export default brandService;
