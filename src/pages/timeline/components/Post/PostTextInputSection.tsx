import React from 'react';
import Input from '@components/common/Input/Input.tsx';

type PostFormState = {
    title: string;
    content: string;
}

type Props = {
    form: PostFormState;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function PostTextInputSection({form, handleOnChange}: Props) {
    return (
        <>
            <div className="mb-6">
                <Input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleOnChange}
                    label="제목"
                    variant="lined"
                />
            </div>
            <div className="mb-8">
                <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
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
        </>
    );
}

export default PostTextInputSection;