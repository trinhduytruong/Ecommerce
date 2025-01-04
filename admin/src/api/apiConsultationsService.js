import apiHelper from '../api/apiHelper';

const apiConsultationsService = {
    add: (data) => {
        return apiHelper.post('user/consultation', data);
    },
    // getListsAdmin: (params) => {
    //     const paramsSearch = new URLSearchParams(params);
    //     return apiHelper.get(`admin/order`,{params: buildFilter(params)});
    // },
    // getLists: (params) => {
    //     const paramsSearch = new URLSearchParams(params);
    //     return apiHelper.get(`user/order`,{params: buildFilter(params)});
    // },
    // deleteOrder: (id) => {
    //     return apiHelper.delete(`user/order/${id}`);
    // },
    // updateOrderStatus: (id, data) => {
    //     return apiHelper.post(`admin/order/update-status/${id}`,data);
    // },
};

export default apiConsultationsService;
