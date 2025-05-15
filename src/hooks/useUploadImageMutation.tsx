import {useMutation} from '@tanstack/react-query';
import {uploadImageApi, UploadImageRequest} from '@api/img/images.ts';

function useUploadImageMutation() {
    return useMutation<UploadImageRequest, Error, UploadImageRequest>({
        mutationFn: (data) => uploadImageApi(data),
        onSuccess: (result) => console.log('업로드 성공', result),
        onError: () => console.error('업로드 실패')
    });
}

export default useUploadImageMutation;