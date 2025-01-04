import apiHelper from '../api/apiHelper';

const apiUpload = {
    uploadImage: (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        return apiHelper.post('/uploads/image', formData, { headers: { 
			'Accept': '*',
			'Content-Type': 'multipart/form-data'

		 } } ).then( ( res ) =>
		{
			return res;
		} ).catch( err => ( {
			status: "error",
			message: err?.response?.data?.message || "Lỗi form"
		} ) )
    },
};

export default apiUpload;
