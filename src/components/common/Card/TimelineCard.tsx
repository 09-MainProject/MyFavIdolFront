import React from 'react';
import { Link } from 'react-router';
import { Comment, Heart } from '@assets/icons/inedx';
import usePostMeta from '@hooks/usePostMeta';
import { Idol } from '@store/idolStore';
import { mockComments } from '@/mocks/data/comment.ts';

type Props = {
  idol: Idol;
};

function TimelineCard({ idol }: Props) {
  const { count, handleLike } = usePostMeta();

  return (
    <div className="flex flex-col gap-4">
      <Link to={`/timeline/${idol.id}`} className="block">
        <img
          src={idol.img}
          alt={idol.name}
          className="h-48 w-full rounded-t-lg object-cover"
        />
        <p className="mt-2 line-clamp-2 px-2 text-sm text-gray-600">
          {idol.description}
        </p>
      </Link>
      <div className="flex items-center gap-4 px-2 text-sm text-gray-500">
        <button
          type="button"
          onClick={handleLike}
          className="flex items-center gap-1 hover:text-red-500"
        >
          <Heart />
          <span>{count}</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-1 hover:text-blue-500"
        >
          <Comment />
          <span>{mockComments.length}</span>
        </button>
      </div>
    </div>
  );
}

export default TimelineCard;
