import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router';
import {UploadImageRequest} from '@api/img/images';
import {createPostApi, updatePostApi} from '@api/timeline/posts';
import {Trash} from '@assets/icons/inedx';
import Input from '@components/common/Input/Input';
import usePostImageManager from '@hooks/usePostImageManager';
import useUploadImageMutation from '@hooks/useUploadImageMutation';
import PerformToast from '@utils/PerformToast';
import {PostCreateRequest, PostResponse} from '@/types/post';

function TimelineWrite() {
    const [form, setForm] = useState({title: '', content: ''});
    const {showImages, imageFiles, handleImageChange, handleImageDelete} = usePostImageManager();
    const uploadImageMutation = useUploadImageMutation();
    const {id} = useParams();
    const navigate = useNavigate();
    const [imageMeta, setImageMeta] = useState<UploadImageRequest>({
        object_type: 'post',
        object_id: 0,
        image_url: '',
        image: null,
    });

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();
        setForm({...form, [e.target.name]: e.target.value});
    };

    const updatePostMutation = useMutation<PostCreateRequest, Error, PostCreateRequest>({
        mutationFn: (data) => updatePostApi(data, Number(id)),
        onSuccess: () => {
            if (imageFiles.length > 0) {
                imageFiles.forEach(file => {
                    uploadImageMutation.mutate({
                        object_type: 'post',
                        object_id: id,
                        image_url: imageMeta.image_url,
                        image: file
                    });
                });
                PerformToast({msg: '이미지 업로드 성공', type: 'success'});
                navigate('/timeline');
            }
        },
        onError: () => {
            PerformToast({msg: '게시글 작성 실패', type: 'error'});
        }
    });

    const createPostMutation = useMutation<PostResponse, Error, PostCreateRequest>({
        mutationFn: (data) => createPostApi(data),
        onSuccess: (result) => {
            setImageMeta((prev) => ({
                ...prev,
                object_id: result.id,
            }));
            if (imageFiles.length > 0) {
                imageFiles.forEach(file => {
                    uploadImageMutation.mutate({
                        object_type: 'post',
                        object_id: result.id,
                        image_url: result.image_url,
                        image: file
                    });
                });
                navigate('/timeline');
            }
            PerformToast({msg: '게시글 작성 성공', type: 'success'});
            navigate('/timeline');
        },
        onError: () => {
            PerformToast({msg: '게시글 작성 실패', type: 'error'});
        },
    });

    return (
        <form className="px-4"
              onSubmit={e => {
                  e.preventDefault();
                  if (id) {
                      updatePostMutation.mutate(form);
                  } else {
                      createPostMutation.mutate(form);
                  }
              }}
        >
            <h2 className="mt-20 mb-8 text-2xl font-bold text-gray-800">
                게시글 작성
            </h2>

            <div className="mb-6">
                <Input type="text" id="title" name="title" value={form.title} onChange={handleOnChange}
                       label="제목" variant="lined"/>
            </div>

            <div className="mb-8">
                <label
                    htmlFor="content"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    내용
                    <textarea
                        id="content"
                        name="content"
                        value={form.content}
                        onChange={handleOnChange}
                        placeholder="내용을 입력하세요"
                        className="mt-4 h-48 w-full resize-none rounded-md border border-gray-300 p-3 text-sm"
                        required
                    />
                </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {
                    showImages.length > 0 && showImages.map((image, i) => (
                        <div key={image}
                             className="relative aspect-square overflow-hidden border border-gray-300">
                            <picture className="absolute top-0 left-0 w-full h-full">
                                <img src={image} alt={image.name}
                                     className="w-full h-full object-cover"/>
                            </picture>
                            <button type="button" onClick={() => handleImageDelete(i)}
                                    className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0 flex justify-center items-center hover:opacity-70 hover:bg-black">
                                <Trash/>
                            </button>
                        </div>
                    ))
                }
            </div>


            <div
                className="flex items-center justify-center size-[200px] border border-gray-300 cursor-pointer mb-4 relative">
                <label htmlFor="inputFile"
                       className="cursor-pointer justify-center w-full h-full li items-center absolute leading-[200px]  text-2xl text-center  text-gray-500">
                    +
                    <input
                        type="file"
                        id="inputFile"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            </div>
            <button type="submit" className="w-full cursor-pointer bg-black text-white py-2 rounded-md">완료</button>
        </form>
    );
}

export default TimelineWrite;
