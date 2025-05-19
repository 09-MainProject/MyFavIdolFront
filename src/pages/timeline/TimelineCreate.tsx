import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {UploadImageRequest} from '@api/img/getImages';
import {createPostApi} from '@api/timeline/getPosts';
import usePostImageManager from '@hooks/usePostImageManager';
import useUploadImageMutation from '@hooks/useUploadImageMutation';
import {useAuthStore} from '@store/authStore';
import PerformToast from '@utils/PerformToast';
import {PostCreateRequest} from '@/types/post';
import {ImageUploader} from './components/TimelineEdit/ImageUploader';
import {PostForm} from './components/TimelineEdit/PostForm';

function TimelineCreate() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {login} = useAuthStore();
    const [form, setForm] = useState<PostCreateRequest>({title: '', content: ''});
    const {showImages, imageFiles, handleImageChange, handleImageDelete} = usePostImageManager();
    const uploadImageMutation = useUploadImageMutation();
    const [imageMeta] = useState<UploadImageRequest>({
        object_type: 'post',
        object_id: 0,
        image_url: '',
        image: null,
    });

    useEffect(() => {
        if (!login) {
            PerformToast({msg: '로그인이 필요한 서비스입니다.', type: 'error'});
            navigate('/login');
        }
    }, [login, navigate]);

    const createPostMutation = useMutation<{id: number}, Error, PostCreateRequest>({
        mutationFn: createPostApi,
        onSuccess: (data) => {
            if (imageFiles.length > 0) {
                uploadImageMutation.mutate({
                    object_type: 'post',
                    object_id: data.id,
                    image_url: imageMeta.image_url,
                    image: imageFiles[0]
                });
                PerformToast({msg: '이미지 업로드 성공', type: 'success'});
            }
            PerformToast({msg: '게시글이 작성되었습니다.', type: 'success'});
            queryClient.invalidateQueries({queryKey: ['posts']});
            navigate(`/timeline/${data.id}`);
        },
        onError: () => {
            PerformToast({msg: '게시글 작성에 실패했습니다.', type: 'error'});
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!login) {
            PerformToast({msg: '로그인이 필요한 서비스입니다.', type: 'error'});
            navigate('/login');
            return;
        }
        createPostMutation.mutate(form);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    if (!login) {
        return null;
    }

    return (
        <form className="px-4" onSubmit={handleSubmit}>
            <h2 className="mt-20 mb-8 text-2xl font-bold text-gray-800">
                게시글 작성
            </h2>

            <PostForm 
                form={form} 
                onInputChange={handleInputChange} 
            />

            <ImageUploader 
                showImages={showImages}
                onImageChange={handleImageChange}
                onImageDelete={handleImageDelete}
            />

            <button 
                type="submit" 
                className="w-full cursor-pointer bg-black text-white py-2 rounded-md"
            >
                작성 완료
            </button>
        </form>
    );
}

export default TimelineCreate;
