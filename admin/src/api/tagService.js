import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const tagService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/tags`, {params: buildFilter(params)});
    },

    add: (petData) => {
        return apiHelper.post('admin/tags', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/tags/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/tags/${id}`);
    },
};

export default tagService;
