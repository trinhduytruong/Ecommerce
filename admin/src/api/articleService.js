import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const articleService = {
    getLists: (params) => {
        return apiHelper.get(`admin/articles`, {params:  buildFilter(params)});
    },
    getListsArticles: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/articles`,{params: buildFilter(params)});
    },

    add: (petData) => {
        return apiHelper.post('admin/articles', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/articles/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/articles/${id}`);
    },
    addArticle: (petData) => {
        return apiHelper.post('user/articles', petData);
    },

    updateArticle: (id, petData) => {
        return apiHelper.put(`user/articles/${id}`, petData);
    },

    deleteArticle: (id) => {
        return apiHelper.delete(`user/articles/${id}`);
    }
};

export default articleService;
