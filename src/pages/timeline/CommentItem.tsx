import React from 'react';
import {Frame} from '@assets/icons/inedx.ts';
import Dropdown from '@components/common/Dropdown/Dropdown.tsx';
import useCommentDropdown from '@hooks/useCommentDropdown.tsx';
import {InputMode} from '@hooks/useComments.tsx';
import {UserComment} from '@mocks/data/comment.ts';

type Props = {
    childCommentMap: Record<string, UserComment[]>;
    item: UserComment;
    inputMode: InputMode;
    setInputMode: React.Dispatch<React.SetStateAction<InputMode>>;
    commentService: {
        handleEditComment: () => void;
        handleAddReplyComment: () => void;
        handleDeleteComment: (comment_id: number) => void;
    }
};

function CommentItem({
                         item,
                         childCommentMap,
                         inputMode,
                         setInputMode,
                         commentService
                     }: Props) {
    const childComments = childCommentMap[item.comment_id] ?? [];
    const {ref, handleToggleIdolDropdown, isIdolDropdownOpen} = useCommentDropdown();

    const renderCommentItem = () => {
        if (inputMode.mode === 'edit' && inputMode.payload.comment_id !== item.comment_id) return null;
        if (inputMode.mode === 'reply' && inputMode.payload.parent_id !== item.comment_id) return null;

        switch (inputMode.mode) {
            case 'edit': {
                return <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 rounded border border-gray-300 p-2 text-sm"
                        value={inputMode?.payload?.value ?? ''}
                        onChange={(e) => setInputMode({
                            mode: 'edit',
                            payload: {...inputMode.payload, value: e.target.value}
                        })}
                    />
                    <button
                        type="button"
                        className="rounded bg-blue-500 px-4 py-1.5 text-sm text-white"
                        onClick={commentService.handleEditComment}
                    >
                        저장
                    </button>
                </div>;
            }
            case 'reply': {
                return <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 rounded border border-gray-300 p-2 text-sm"
                        value={inputMode?.payload?.value ?? ''}
                        onChange={(e) => setInputMode({
                            mode: 'reply',
                            payload: {...inputMode.payload, value: e.target.value}
                        })}
                    />
                    <button
                        type="button"
                        className="rounded bg-blue-500 px-4 py-1.5 text-sm text-white"
                        onClick={commentService.handleAddReplyComment}
                    >
                        저장
                    </button>
                </div>;
            }
            case 'unknown':
                return null;
            default:
                return null;
        }
    };

    return (
        <li className="relative w-full border-b border-gray-100 last:border-none">
            <div className="flex w-full items-start gap-4 pr-12">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"/>

                <div className="flex-1">
                    <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">
              {item.parent_id && <span className="text-blue-500">답글 · </span>}
                {item.author}
            </span>
                        <span className="text-xs text-gray-400">{item.createdAt}</span>
                    </div>

                    <p className="mt-1 text-sm whitespace-pre-wrap text-gray-900">
                        {item.content}
                    </p>
                    <form className="mt-4">
                        {renderCommentItem()}
                    </form>
                </div>
            </div>

            <div className="absolute top-4 right-4" ref={ref}>
                <button
                    type="button"
                    onClick={() => handleToggleIdolDropdown(String(item.comment_id))}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <Frame/>
                </button>
                <Dropdown
                    isDropdownOpen={isIdolDropdownOpen === String(item.comment_id)}
                    handleToggleIdolDropdown={() => handleToggleIdolDropdown(String(item.comment_id))}
                    mode="comment"
                >
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                handleToggleIdolDropdown(String(item.comment_id));
                                setInputMode({mode: 'reply', payload: {parent_id: item.comment_id}});
                            }}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            답글 달기
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                            onClick={() => setInputMode({
                                mode: 'edit',
                                payload: {comment_id: item.comment_id}
                            })}
                        >
                            수정
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                            onClick={() => commentService.handleDeleteComment(item.comment_id)}
                        >
                            삭제
                        </button>
                    </div>
                </Dropdown>
            </div>
            <ul className="mt-4 space-y-4">
                {childComments.map(replyComment =>
                    <CommentItem
                        key={replyComment.comment_id}
                        item={replyComment}
                        childCommentMap={childCommentMap}
                        inputMode={inputMode}
                        setInputMode={setInputMode}
                        commentService={commentService}
                    />
                )
                }
            </ul>
        </li>
    );
}

export default React.memo(CommentItem);
