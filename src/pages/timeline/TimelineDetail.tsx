import React, {useCallback, useState} from 'react';
import {useNavigate, useParams} from 'react-router';
import CardFrame from '@components/CardFrame';
import useComments from '@hooks/useComments.tsx';
import CommentItem from '@pages/timeline/CommentItem.tsx';
import TimelineDetailCard from '@pages/timeline/TimelineDetailCard.tsx';
import {useTimelineStore} from '@store/useTimelineStore';

function TimelineDetail() {
    const {posts, removePost} = useTimelineStore();
    const [rootInput, setRootInput] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    const {
        inputMode,
        setInputMode,
        comments,
        setComments,
        parentComments,
        childCommentMap,
    } = useComments();

    const idolDetail = posts.find(idol => idol?.id?.toString() === id);

    const handleDeletePost = () => {
        removePost(Number(id));
        navigate('/timeline');
    };

    const handleEditComment = useCallback(() => {
        setComments((prev) => (prev.map(item => item.comment_id === inputMode.payload.comment_id ? {
            ...item,
            content: inputMode?.payload?.value
        } : item)));
        setInputMode({mode: 'unknown'});
    }, [inputMode, setComments, setInputMode]);

    const handleAddReplyComment = useCallback(() => {
        const newReply = {
            comment_id: Number(new Date()),
            content: inputMode.payload.value,
            author: 'dndndㄻㅇㄴㄹㄴㅇn',
            createdAt: new Date().toISOString(),
            parent_id: inputMode.payload.parent_id,
            img: '../src/assets/img/ncity.jpeg'
        };
        setComments((prev) => [...prev, newReply]);
        setInputMode({mode: 'unknown'});
    }, [inputMode, setComments, setInputMode]);

    const handleDeleteComment = useCallback((comment_id: number) => {
        const find = comments.find(item => item.comment_id === comment_id);
        const parent = find.parent_id;
        setComments((prev) => prev.map(item => item.parent_id === comment_id ? {
            ...item,
            parent_id: parent,
        } : item).filter(v => v.comment_id !== comment_id));
    }, [setComments, comments]);

    const handleAllDeleteComment = (comment_id: number) => {
        setComments((prev) => prev.filter(item => item.comment_id !== comment_id));
    };

    const handleAddRootComment = () => {
        setRootInput('');
        setComments((prev) => ([...prev, {
            comment_id: Number(new Date()),
            content: rootInput,
            parent_id: null,
            img: 'dasdas',
            author: 'dasd',
            createdAt: new Date().toISOString()
        }]));
    };

    const commentService = {
        handleEditComment,
        handleAddReplyComment,
        handleDeleteComment,
        handleAllDeleteComment
    };

    return (
        <div className="mt-12 p-4">
            {/* <ProfileHeader */}
            {/*     avatar={idolDetail.img} */}
            {/*     nickname={idolDetail.name} */}
            {/*     startDate={idolDetail.startDate} */}
            {/*     mode="post" */}
            {/* /> */}
            <CardFrame>
                <TimelineDetailCard
                    idol={idolDetail}
                    handleDeletePost={handleDeletePost}
                />
                <ul className="mt-6 border-t border-gray-200 p-4">
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
                            onClick={handleAddRootComment}
                        >
                            저장
                        </button>
                    </div>
                    {parentComments.map(item => (
                        <CommentItem
                            key={item.comment_id}
                            item={item}
                            childCommentMap={childCommentMap}
                            inputMode={inputMode}
                            setInputMode={setInputMode}
                            commentService={commentService}
                        />
                    ))}
                </ul>
            </CardFrame>
        </div>
    );
}

export default TimelineDetail;
