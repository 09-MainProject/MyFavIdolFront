import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router';
import {getDetailPostApi} from '@api/timeline/getPosts.ts';
import CardFrame from '@components/CardFrame';
import ProfileHeader from '@components/common/Profile/ProfileHeader.tsx';
import TimelineDetailCard from '@pages/timeline/components/Card/TimelineDetailCard.tsx';
import CommentItem from '@pages/timeline/components/Comment/CommentItem.tsx';
import RootCommentInput from '@pages/timeline/components/Comment/RootCommentInput.tsx';
import useCommentHandlers from '@pages/timeline/components/hooks/useCommentHandlers.tsx';
import useComments from '@pages/timeline/components/hooks/useComments.tsx';
import {useAuthStore} from '@store/authStore.ts';

function TimelineDetail() {
    const [rootInput, setRootInput] = useState('');
    const {id} = useParams();
    const {login, user} = useAuthStore();
    const navigate = useNavigate();
    const getDetailPost = useQuery({
        queryKey: ['post', id],
        queryFn: () => getDetailPostApi(id)
    });
    const {
        inputMode,
        setInputMode,
        setComments,
        parentComments,
        childCommentMap,
    } = useComments(id);
    const {
        handleAddRootComment,
        handleAddReplyComment,
        handleEditComment,
        handleDeleteComment,
        handleAllDeleteComment,
        handleDeletePost
    } = useCommentHandlers({id, inputMode, setInputMode, rootInput, setRootInput, setComments, login, navigate});

    const commentService = {
        handleAddRootComment,
        handleAddReplyComment,
        handleEditComment,
        handleDeleteComment,
        handleAllDeleteComment
    };

    return (
        <div className="mt-12 p-4">
            <ProfileHeader
                image_url={getDetailPost.data?.image_url}
                created_at={getDetailPost.data?.created_at}
                nickname={getDetailPost.data?.author}
                mode="post"
            />
            <CardFrame>
                <TimelineDetailCard
                    getDetailPost={getDetailPost.data}
                    handleDeletePost={handleDeletePost}
                />
                <ul className="mt-6 border-t border-gray-200 p-4">
                    {
                        login &&
                        <RootCommentInput rootInput={rootInput} setRootInput={setRootInput}
                                          onSubmit={handleAddRootComment}/>
                    }
                    {parentComments.map(item => (
                        <CommentItem
                            key={item.id}
                            item={item}
                            childCommentMap={childCommentMap}
                            inputMode={inputMode}
                            setInputMode={setInputMode}
                            commentService={commentService}
                            user={user}
                            login={login}
                        />
                    ))}
                </ul>
            </CardFrame>
        </div>
    );
}

export default TimelineDetail;
