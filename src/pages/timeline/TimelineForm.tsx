import {useNavigate, useParams} from 'react-router';
import usePostFormHandler from '@pages/timeline/components/hooks/usePostFormHandler';
import PostImageUploadSection from '@pages/timeline/components/Post/PostImageUploadSection';
import PostSubmitButton from '@pages/timeline/components/Post/PostSubmitButton';
import PostTextInputSection from '@pages/timeline/components/Post/PostTextInputSection';

function TimelineForm() {
    const {id} = useParams();
    const navigate = useNavigate();

    const {
        form,
        handleOnChange,
        handleSubmit,
        showImages,
        handleImageDelete,
        handleImageChange,
        isEdit,
    } = usePostFormHandler({id, navigate});

    return (
        <form className="px-4" onSubmit={handleSubmit}>
            <h2 className="mt-20 mb-8 text-2xl font-bold text-gray-800">{isEdit ? '게시글 수정' : '게시글 작성'}</h2>
            <PostTextInputSection form={form} handleOnChange={handleOnChange}/>
            <PostImageUploadSection
                showImages={showImages}
                handleImageDelete={handleImageDelete}
                handleImageChange={handleImageChange}
            />
            <PostSubmitButton isEdit={isEdit}/>
        </form>
    );
}

export default TimelineForm;