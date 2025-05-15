import {useMutation} from '@tanstack/react-query';
import {uploadImageApi, UploadImageRequest} from '@api/img/images.ts';

function useUploadImageMutation() {
    return useMutation<UploadImageRequest, Error, UploadImageRequest>({
        mutationFn: (data) => uploadImageApi(data),
        // eslint-disable-next-line no-console
        onSuccess: (result) => console.log('업로드 성공', result),
        // eslint-disable-next-line no-console
        onError: () => console.error('업로드 실패')
    });
}

export default useUploadImageMutation;