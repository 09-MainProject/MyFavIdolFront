import {api} from '@/lib/api.ts';

export type UploadImageRequest = {
    image_url?: string;
    object_type: string;
    object_id: number | string;
    image?: File | null;
}

export const uploadImageApi = async (data: UploadImageRequest): Promise<UploadImageRequest> => {
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('object_type', data.object_type);
    formData.append('object_id', data.object_id.toString());
    if (data.image_url) {
        formData.append('image_url', data.image_url);
    }
    const response = await api.post('/images/upload', formData);
    return response.data;
};

export const DeleteImageApi = async (data: UploadImageRequest): Promise<UploadImageRequest> => {
    const formData = new FormData();
    formData.append('object_type', data.object_type);
    formData.append('object_id', data.object_id.toString());
    const response = await api.request({
        url: '/images/delete',
        method: 'DELETE',
        data: formData,
    });
    return response.data;
};