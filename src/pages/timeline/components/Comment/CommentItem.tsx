import React from 'react';
import {Frame} from '@assets/icons/inedx.ts';
import Dropdown from '@components/common/Dropdown/Dropdown.tsx';
import {DeleteButton, EditButton, ReplyButton} from '@pages/timeline/components/Comment/CommentActions.tsx';
import CommentAuthorInfo from '@pages/timeline/components/Comment/CommentAuthorInfo.tsx';
import CommentInput from '@pages/timeline/components/Comment/CommentInput.tsx';
import useCommentDropdown from '@pages/timeline/components/hooks/useCommentDropdown.tsx';
import {InputMode} from '@pages/timeline/components/hooks/useComments.tsx';
import {formatDate} from '@utils/date.ts';
import {CommentListItem} from '@/types/comment.ts';

type Props = {
    childCommentMap: Record<string, CommentListItem[]>;
    item: CommentListItem;
    inputMode: InputMode;
    user: boolean;
    login: boolean;
    setInputMode: React.Dispatch<React.SetStateAction<InputMode>>;
    commentService: {
        handleEditComment: () => void;
        handleAddReplyComment: () => void;
        handleDeleteComment: (comment_id: number) => void;
        handleAllDeleteComment: (comment_id: number) => void;
    }
};

function CommentItem({
                         item,
                         childCommentMap,
                         inputMode,
                         setInputMode,
                         commentService,
                         user,
                         login
                     }: Props) {
    const childComments = childCommentMap[String(item.id)] ?? [];
    const {ref, handleCommentDropdownToggle, commentDropdownOpen} = useCommentDropdown();
    const formattedDate = formatDate(item.created_at, 'yyyy-MM-dd HH:mm:ss');
    const isMine = user?.nickname === item.author;

    return (
        <li className="relative w-full border-b border-gray-100 last:border-none">
            <div className="flex w-full items-start gap-4 pr-12">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"/>
                <div className="flex-1">
                    <CommentAuthorInfo
                        author={item.author}
                        date={formattedDate}
                        isReply={Boolean(item.parent)}
                    />
                    <p className="mt-1 text-sm whitespace-pre-wrap text-gray-900">
                        {item.content}
                    </p>
                    <CommentInput
                        commentId={item.id}
                        mode={inputMode.mode}
                        inputMode={inputMode}
                        onChange={setInputMode}
                        onSubmit={
                            inputMode.mode === 'edit'
                                ? commentService.handleEditComment
                                : commentService.handleAddReplyComment
                        }
                    />
                </div>
            </div>

            <div className="absolute top-4 right-4" ref={ref}>
                <button
                    type="button"
                    onClick={() => handleCommentDropdownToggle(String(item.id))}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <Frame/>
                </button>
                <Dropdown
                    dropdownOpen={commentDropdownOpen === String(item.id)}
                    handleToggleDropdown={() => handleCommentDropdownToggle(String(item.id))}
                    mode="comment"
                >
                    <ReplyButton
                        commentId={item.id.toString()}
                        isParent={!item.parent}
                        isLoggedIn={login}
                        onClick={(id) => {
                            handleCommentDropdownToggle(String(id));
                            setInputMode({mode: 'reply', payload: {parent_id: Number(id)}});
                        }}
                    />
                    {isMine && (
                        <>
                            <EditButton
                                onClick={() =>
                                    setInputMode({mode: 'edit', payload: {comment_id: item.id}})
                                }
                            />
                            <DeleteButton
                                onClick={() =>
                                    item.parent
                                        ? commentService.handleDeleteComment(item.id)
                                        : commentService.handleAllDeleteComment(item.id)
                                }
                                isAll={!item.parent}
                            />
                        </>
                    )}
                </Dropdown>
            </div>
            <ul className="mt-4 space-y-4 pl-4">
                {childComments.length > 0 &&
                    childComments.map(replyComment =>
                        <CommentItem
                            key={replyComment.id}
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
