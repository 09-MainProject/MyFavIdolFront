import React, {useState} from 'react';
import {Frame} from '@assets/icons/inedx.ts';
import Dropdown from '@components/common/Dropdown/Dropdown.tsx';
import useCommentDropdown from '@hooks/useCommentDropdown.tsx';
import {InputMode, ChildCommentMap} from '@hooks/useComments.tsx';
import CommentActions from '@pages/timeline/components/Comments/CommentActions.tsx';
import CommentContent from '@pages/timeline/components/Comments/CommentContent.tsx';
import CommentEditor from '@pages/timeline/components/Comments/CommentEditor.tsx';
import {CommentListItemResponse} from '@/types/comment.ts';

type CommentService = {
    handleEditComment: (commentId: number, content: string) => void;
    handleDeleteComment: (commentId: number) => void;
    handleAddReplyComment: () => void;
    handleAllDeleteComment: (parent: number) => void;
};

type Props = {
    item: CommentListItemResponse;
    childCommentMap: ChildCommentMap;
    inputMode: InputMode;
    setInputMode: (mode: InputMode) => void;
    commentService: CommentService;
    onEdit: (commentId: number, content: string) => void;
    onDelete: (commentId: number) => void;
};

function CommentItem({
    item,
    childCommentMap,
    inputMode,
    setInputMode,
    commentService,
    onEdit,
    onDelete
}: Props) {
    const childComments = childCommentMap[item.id] ?? [];
    const {commentDropdownOpen, handleCommentDropdownToggle, ref} = useCommentDropdown();
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleReplyClick = () => {
        setIsReplying(true);
        setInputMode({
            mode: 'reply',
            payload: {
                parent: item.id,
                value: '',
            },
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setInputMode({
            mode: 'edit',
            payload: {
                comment_id: item.id,
                value: item.content,
            },
        });
    };

    const handleDeleteClick = () => {
        onDelete(item.id);
    };

    const handleDeleteAllClick = () => {
        commentService.handleAllDeleteComment(item.id);
    };

    const handleReplySubmit = () => {
        commentService.handleAddReplyComment();
        setIsReplying(false);
    };

    const handleEditSubmit = (content: string) => {
        onEdit(item.id, content);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <li className="py-4">
                <CommentEditor
                    mode="edit"
                    value={inputMode.payload?.value ?? ''}
                    onChange={(value) =>
                        setInputMode({
                            mode: 'edit',
                            payload: {...inputMode.payload, value},
                        })
                    }
                    onEdit={handleEditSubmit}
                    onCancel={() => setIsEditing(false)}
                />
            </li>
        );
    }

    return (
        <li className="py-4">
            <div className="flex items-start justify-between">
                <CommentContent
                    author={item.author}
                    content={item.content}
                    createdAt={item.created_at}
                    commentId={item.id}
                />
                <div ref={ref} className="relative">
                    <button
                        type="button"
                        onClick={() => handleCommentDropdownToggle(String(item.id))}
                        className="p-1 text-gray-400 hover:text-gray-600"
                    >
                        <Frame/>
                    </button>
                    <Dropdown
                        dropdownOpen={commentDropdownOpen === String(item.id)}
                        handleToggleDropdown={() => handleCommentDropdownToggle(String(item.id))}
                        mode="comment"
                    >
                        <CommentActions
                            isParent={childComments.length > 0}
                            isChild={item.parent !== null}
                            handleDropdownToggle={() => handleCommentDropdownToggle(String(item.id))}
                            onDelete={handleDeleteClick}
                            onDeleteAll={handleDeleteAllClick}
                            onReply={handleReplyClick}
                            onEdit={handleEditClick}
                        />
                    </Dropdown>
                </div>
            </div>
            {isReplying && (
                <div className="ml-8 mt-4">
                    <CommentEditor
                        mode="reply"
                        value={inputMode.payload?.value ?? ''}
                        onChange={(value) =>
                            setInputMode({
                                mode: 'reply',
                                payload: {...inputMode.payload, value},
                            })
                        }
                        onSubmit={handleReplySubmit}
                        onCancel={() => setIsReplying(false)}
                    />
                </div>
            )}
            {childComments.length > 0 && (
                <ul className="ml-8 mt-4 space-y-4">
                    {childComments.map((child) => (
                        <CommentItem
                            key={child.id}
                            item={child}
                            childCommentMap={childCommentMap}
                            inputMode={inputMode}
                            setInputMode={setInputMode}
                            commentService={commentService}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default React.memo(CommentItem);
