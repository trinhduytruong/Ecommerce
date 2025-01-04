import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const apiProductService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`products`,{params: buildFilter(params)});
    },
    getListsLabel: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`products/label`,{params: buildFilter(params)});
    },
    showProductDetail: (id) => {
        return apiHelper.get(`products/show/${id}`);
    },
    showDashboardVoteDetail: (id) => {
        return apiHelper.get(`products/vote-dashboard/${id}`);
    },
};

export default apiProductService;
