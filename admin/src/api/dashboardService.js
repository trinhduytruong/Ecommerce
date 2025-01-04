import apiHelper from '../api/apiHelper';
import { buildFilter } from '../helpers/commonfunc';

const dashboardService = {
    getDashboard: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/dashboard`,{params: buildFilter(params)});
    },
    getFetchMonthlyRevenue: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/dashboard/fetch-monthly-revenue`,{params: buildFilter(params)});
    },
    getFetchDailyRevenue: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/dashboard/fetch-daily-revenue`,{params: buildFilter(params)});
    },
    getFetchNewOrder: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/dashboard/fetch-order-news`,{params: buildFilter(params)});
    },
    getFetchNewUser: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/dashboard/fetch-user-news`,{params: buildFilter(params)});
    },
};

export default dashboardService;
