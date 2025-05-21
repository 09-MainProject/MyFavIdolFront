import React from 'react';

type Props = {
    rootInput: string;
    setRootInput: (v: string) => void;
    onSubmit: () => void;
}

function RootCommentInput({
                              rootInput,
                              setRootInput,
                              onSubmit,
                          }: Props) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                className="flex-1 rounded border border-gray-300 p-2 text-sm"
                value={rootInput}
                onChange={(e) => setRootInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="댓글을 입력하세요..."
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

export default RootCommentInput;