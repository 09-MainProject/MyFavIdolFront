import React from 'react';

type Props = {
    mode?: 'edit' | 'reply';
    value?: string;
    onChange?: (value: string) => void;
    onSubmit?: () => void;
    onEdit?: (content: string) => void;
    onCancel?: () => void;
};

function CommentEditor({
    mode = 'reply',
    value = '',
    onChange,
    onSubmit,
    onEdit,
    onCancel
}: Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'edit' && onEdit) {
            onEdit(value);
        } else if (onSubmit) {
            onSubmit();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
                value={value}
                onChange={handleChange}
                placeholder="댓글을 입력하세요"
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
                    >
                        취소
                    </button>
                )}
                <button
                    type="submit"
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    {mode === 'edit' ? '수정' : '작성'}
                </button>
            </div>
        </form>
    );
}

export default React.memo(CommentEditor);
