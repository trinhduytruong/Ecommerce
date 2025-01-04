import { buildFilter } from "../helpers/commonfunc";
import apiHelper from "./apiHelper";

const promotionService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/promotions`,{params: buildFilter(params)});
    },

    add: (petData) => {
        return apiHelper.post('admin/promotions', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/promotions/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/promotions/${id}`);
    },
};

export default promotionService;
