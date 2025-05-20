import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import {createPostApi, updatePostApi} from '@api/timeline/getPosts.ts';
import usePostImageManager from '@hooks/usePostImageManager.tsx';
import useUploadImageMutation from '@hooks/useUploadImageMutation.tsx';
import PerformToast from '@utils/PerformToast.tsx';
import {PostCreateRequest, PostResponse} from '@/types/post.ts';

type UsePostFormHandlerParams = {
    id?: string;
    navigate: ReturnType<typeof useNavigate>;
};

function usePostFormHandler({id, navigate}: UsePostFormHandlerParams) {
    const [form, setForm] = useState({title: '', content: ''});
    const {showImages, imageFiles, handleImageChange, handleImageDelete} = usePostImageManager();
    const uploadImageMutation = useUploadImageMutation();
    const queryClient = useQueryClient();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleImageUploads = async (postId: number | string, imageUrl?: string) => {
        if (!imageFiles.length) return;
        await Promise.all(
            imageFiles.map((file) =>
                uploadImageMutation.mutateAsync({
                    object_type: 'post',
                    object_id: postId,
                    image_url: imageUrl || '',
                    image: file,
                })
            )
        );
        PerformToast({msg: '이미지 업로드 성공', type: 'success'});
    };

    const createPostMutation = useMutation<PostResponse, Error, PostCreateRequest>({
        mutationFn: createPostApi,
        onSuccess: async (result) => {
            await handleImageUploads(result.id, result.image_url);
            PerformToast({msg: '게시글 작성 성공', type: 'success'});
            navigate('/timeline');
        },
        onError: () => PerformToast({msg: '게시글 작성 실패', type: 'error'}),
    });

    const updatePostMutation = useMutation<PostCreateRequest, Error, PostCreateRequest>({
        mutationFn: (data) => updatePostApi(data, Number(id)),
        onSuccess: async () => {
            await handleImageUploads(id!);
            queryClient.invalidateQueries({queryKey: ['post', id]});
            PerformToast({msg: '게시글 수정 성공', type: 'success'});
            navigate('/timeline');
        },
        onError: () => PerformToast({msg: '게시글 수정 실패', type: 'error'}),
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            updatePostMutation.mutate(form);
        } else {
            createPostMutation.mutate(form);
        }
    };

    return {
        form,
        handleOnChange,
        handleSubmit,
        showImages,
        handleImageDelete,
        handleImageChange,
        isEdit: Boolean(id),
    };
}

export default usePostFormHandler;