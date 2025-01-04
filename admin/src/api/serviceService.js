import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const serviceService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/services`,{params: buildFilter(params)});
    },
    getListsRegister: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/services/register`,{params: buildFilter(params)});
    },

    add: (petData) => {
        return apiHelper.post('admin/services', petData);
    },
    register: (petData) => {
        return apiHelper.post('service/register', petData);
    },
    update: (id, petData) => {
        return apiHelper.put(`admin/services/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/services/${id}`);
    },
    deleteUserService: (id) => {
        return apiHelper.delete(`admin/services/register/${id}`);
    },
};

export default serviceService;
