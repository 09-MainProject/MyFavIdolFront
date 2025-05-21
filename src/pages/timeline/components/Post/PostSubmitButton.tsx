function PostSubmitButton({isEdit}: { isEdit: boolean }) {
    return (
        <button type="submit" className="w-full cursor-pointer bg-black text-white py-2 rounded-md">
            {isEdit ? '수정 완료' : '작성 완료'}
        </button>
    );
}

export default PostSubmitButton;