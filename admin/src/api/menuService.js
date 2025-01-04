import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const menuService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/menus`,{params: buildFilter(params)});
    },

    add: (petData) => {
        return apiHelper.post('admin/menus', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/menus/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/menus/${id}`);
    },
};

export default menuService;
