import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const productService = {
    getLists: (params) => {
        return apiHelper.get(`admin/products`, {params:  buildFilter(params)});
    },

    getListsProducts: (params) => {
        return apiHelper.get(`user/products`,  buildFilter(params));
    },

    add: (petData) => {
        return apiHelper.post('admin/products', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/products/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/products/${id}`);
    },
    addProduct: (petData) => {
        return apiHelper.post('user/products', petData);
    },

    updateProduct: (id, petData) => {
        return apiHelper.put(`user/products/${id}`, petData);
    },

    deleteProduct: (id) => {
        return apiHelper.delete(`user/products/${id}`);
    }
};

export default productService;
