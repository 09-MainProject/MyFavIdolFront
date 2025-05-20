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
    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                className="flex-1 rounded border border-gray-300 p-2 text-sm"
                value={rootInput}
                onChange={(e) => setRootInput(e.target.value)}
            />
            <button
                type="button"
                className="rounded bg-blue-500 px-4 py-1.5 text-sm text-white"
                onClick={onSubmit}
            >
                저장
            </button>
        </div>
    );
}

export default RootCommentInput;