import {useMutation} from '@tanstack/react-query';
import {uploadImageApi, UploadImageRequest} from '@api/img/images';
import PerformToast from '@utils/PerformToast';

function useUploadImageMutation() {
    return useMutation<UploadImageRequest, Error, UploadImageRequest>({
        mutationFn: (data) => uploadImageApi(data),
        onSuccess: () => {
            PerformToast({msg: '이미지 업로드 성공', type: 'success'});
        },
        onError: () => {
            PerformToast({msg: '이미지 업로드 실패', type: 'error'});
        }
    });
}

export default useUploadImageMutation;