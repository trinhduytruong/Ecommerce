import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const userService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/users`, {params: buildFilter({...params})});
    },
    getListsAdmin: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`users`, {params: buildFilter({...params, user_type: "ADMIN"})});
    },

    add: (petData) => {
        return apiHelper.post('admin/users', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/users/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/users/${id}`);
    },
    getProfile: (id) => {
        return apiHelper.get(`me`);
    },
    updateProfile: (data) => {
        return apiHelper.put(`me`,data);
    },
    forgotPassword: (data) => {
        return apiHelper.post(`auth/forgot-password`,data);
    },
    resetPassword: (data) => {
        return apiHelper.post(`auth/reset-password`,data);
    },
};

export default userService;
