import React from 'react';
import {InputMode} from '@pages/timeline/components/hooks/useComments.tsx';

type Props = {
    commentId: number;
    mode: 'unknown' | 'edit' | 'reply';
    inputMode: InputMode;
    onChange: React.Dispatch<React.SetStateAction<InputMode>>;
    onSubmit: () => void;
};

function CommentInput({commentId, mode, inputMode, onChange, onSubmit}: Props) {
    const isEditing = mode === 'edit' && inputMode.payload?.comment_id === commentId;
    const isReplying = mode === 'reply' && inputMode.payload?.parent_id === commentId;

    if (!isEditing && !isReplying) return null;

    const value = inputMode.payload?.value ?? '';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="flex gap-2 mt-4">
            <input
                type="text"
                className="flex-1 rounded border border-gray-300 p-2 text-sm"
                value={value}
                onChange={(e) =>
                    onChange({
                        mode,
                        payload: {...inputMode.payload, value: e.target.value},
                    })
                }
                onKeyDown={handleKeyDown}
                placeholder={isEditing ? '댓글을 수정하세요...' : '답글을 입력하세요...'}
            />
            <button
                type="button"
                className="rounded bg-black px-4 py-1.5 text-sm text-white"
                onClick={onSubmit}
            >
                저장
            </button>
        </div>
    );
}

export default CommentInput;