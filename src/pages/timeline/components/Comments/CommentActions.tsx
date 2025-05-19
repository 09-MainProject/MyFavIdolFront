import React from 'react';

type CommentActionsProps = {
    isParent: boolean;
    isChild: boolean;
    handleDropdownToggle: () => void;
    onDelete: () => void;
    onDeleteAll: () => void;
    onReply: () => void;
    onEdit: () => void;
};

function CommentActions({
    isParent,
    isChild,
    handleDropdownToggle,
    onDelete,
    onDeleteAll,
    onReply,
    onEdit
}: CommentActionsProps) {
    return (
        <div className="flex flex-col">
            <button
                type="button"
                onClick={() => {
                    onEdit();
                    handleDropdownToggle();
                }}
                className="px-4 py-2 text-left hover:bg-gray-100"
            >
                수정
            </button>
            <button
                type="button"
                onClick={() => {
                    onDelete();
                    handleDropdownToggle();
                }}
                className="px-4 py-2 text-left hover:bg-gray-100"
            >
                삭제
            </button>
            {isParent && (
                <button
                    type="button"
                    onClick={() => {
                        onDeleteAll();
                        handleDropdownToggle();
                    }}
                    className="px-4 py-2 text-left hover:bg-gray-100"
                >
                    전체 삭제
                </button>
            )}
            {!isChild && (
                <button
                    type="button"
                    onClick={() => {
                        onReply();
                        handleDropdownToggle();
                    }}
                    className="px-4 py-2 text-left hover:bg-gray-100"
                >
                    답글
                </button>
            )}
        </div>
    );
}

export default CommentActions;
