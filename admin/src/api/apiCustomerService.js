import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const apiCustomerService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/users`,{params: buildFilter(params)});
    }
};

export default apiCustomerService;
