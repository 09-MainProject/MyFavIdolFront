import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {useParams} from 'react-router';
import {getDetailPostApi} from '@api/timeline/getPosts';
import CardFrame from '@components/CardFrame';
import ProfileHeader from '@components/common/Profile/ProfileHeader.tsx';
import {useCommentHandlers} from '@hooks/useCommentHandlers.tsx';
import useComments from '@hooks/useComments';
import TimelineDetailCard from '@pages/timeline/components/Cards/TimelineDetailCard';
import CommentItem from '@pages/timeline/components/Comments/CommentItem';
import RootForm from '@pages/timeline/components/Comments/RootForm.tsx';

function TimelineDetail() {
    const [commentInput, setCommentInput] = useState('');
    const {id} = useParams();
    const {
        inputMode,
        setInputMode,
        comments,
        setComments,
        parentComments,
        childCommentMap,
    } = useComments(id);

    const {
        handleAddRootComment,
        handleAddReplyComment,
        handleAllDeleteComment,
        handleDeleteComment,
        handleEditComment
    } = useCommentHandlers({
        postId: id,
        comments,
        setComments,
        inputMode,
        setInputMode,
        rootInput: commentInput,
        setRootInput: setCommentInput,
    });

    const {data: postDetail, isLoading, error} = useQuery({
        queryKey: ['post', id],
        queryFn: () => getDetailPostApi(id!),
        enabled: !!id
    });

    const commentService = {
        handleEditComment,
        handleAddReplyComment,
        handleDeleteComment,
        handleAllDeleteComment
    };

    if (isLoading) return null;
    if (error) return null;
    if (!postDetail) return null;

    return (
        <div className="mt-12 p-4">
            <ProfileHeader
                image_url={postDetail.image_url}
                nickname={postDetail.author}
                created_at={postDetail.created_at}
                mode="post"
            />
            <CardFrame>
                <TimelineDetailCard
                    postDetail={postDetail}
                    id={id!}
                />
                <ul className="mt-6 border-t border-gray-200 p-4">
                    <RootForm
                        rootInput={commentInput}
                        setRootInput={setCommentInput}
                        handleAddRootComment={handleAddRootComment}
                    />
                    {parentComments.map(comment => (
                        <CommentItem
                            key={comment.id}
                            item={comment}
                            childCommentMap={childCommentMap}
                            inputMode={inputMode}
                            setInputMode={setInputMode}
                            commentService={commentService}
                            onEdit={handleEditComment}
                            onDelete={handleDeleteComment}
                        />
                    ))}
                </ul>
            </CardFrame>
        </div>
    );
}

export default TimelineDetail;
