import React from 'react';
import { useNavigate, useParams } from 'react-router';
import CardFrame from '@components/CardFrame';
import CommentItem from '@components/common/Card/CommentItem';
import TimelineDetailCard from '@components/common/Card/TimelineDetailCard';
import ProfileHeader from '@components/common/Profile/ProfileHeader';
import useCommentHandlers from '@hooks/useCommentHandlers';
import { useTimelineStore } from '@store/useTimelineStore';

function TimelineDetail() {
  const { posts, removePost } = useTimelineStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    comment,
    activeInput,
    handleEditInit,
    handleOnEdit,
    handleOnChange,
    handleReplyInit,
    handleOnReply,
    handleOnRemove,
  } = useCommentHandlers();

  const handleDeletePost = () => {
    removePost(Number(id));
    navigate('/timeline');
  };
  const idolDetail = posts.find(idol => idol.id.toString() === id);

  return (
    <div className="mt-12 p-4">
      <ProfileHeader
        avatar={idolDetail.img}
        nickname={idolDetail.name}
        startDate={idolDetail.startDate}
        mode="post"
      />
      <CardFrame>
        <TimelineDetailCard
          idol={idolDetail}
          handleDeletePost={handleDeletePost}
        />
        <ul className="mt-6 border-t border-gray-200 p-4">
          {comment
            .filter(item => item.parentId == null)
            .map(item => (
              <CommentItem
                key={item.id}
                value={activeInput}
                item={item}
                allComments={comment}
                handleOnChange={handleOnChange}
                handleOnRemove={handleOnRemove}
                handleOnEdit={handleOnEdit}
                handleEditInit={handleEditInit}
                handleReplyInit={handleReplyInit}
                activeInput={activeInput}
                handleOnReply={handleOnReply}
              />
            ))}
        </ul>
      </CardFrame>
    </div>
  );
}

export default TimelineDetail;
