import apiHelper from '../api/apiHelper';

const postService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/posts`,{params: buildFilter(params)});
    },
    getListsMenus: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/menus`,{params: buildFilter(params)});
    },

    add: (petData) => {
        return apiHelper.post('user/posts', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`user/posts/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`user/posts/${id}`);
    },
    uploadPostImage: (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        return apiHelper.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export default postService;
