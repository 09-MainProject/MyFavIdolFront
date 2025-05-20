import React, {useRef, useState} from 'react';
import {Link} from 'react-router';
import {Comment, Frame} from '@assets/icons/inedx.ts';
import Dropdown from '@components/common/Dropdown/Dropdown.tsx';
import useOutsideClick from '@hooks/useOutsideClick.tsx';
import LikeButton from '@pages/timeline/components/Like/LikeButton.tsx';
import {useAuthStore} from '@store/authStore.ts';
import {PostResponse} from '@/types/post.ts';

type Props = {
    getDetailPost: PostResponse;
    handleDeletePost: () => void;
};

function TimelineDetailCard({getDetailPost, handleDeletePost}: Props) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {user} = useAuthStore();

    useOutsideClick(dropdownRef, () => setDropdownOpen(false), dropdownOpen);

    const handleToggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const isMine = user?.nickname === getDetailPost?.author;

    return (
        <div className="mt-8 rounded-xl bg-white">
            <img
                src={getDetailPost?.image_url}
                alt={getDetailPost?.title}
                className="max-h-[600px] w-full rounded-t-xl object-cover"
            />
            <p className="p-4 pt-8 text-lg text-gray-800">{getDetailPost?.content}</p>
            <div className="flex items-center justify-between border-t border-gray-200 p-4">
                <div className="flex items-center gap-6">
                    <LikeButton
                        id={getDetailPost?.id.toString()}
                        count={getDetailPost?.likes_count}
                        is_deleted={getDetailPost?.is_deleted}
                        liked={getDetailPost?.is_liked}
                    />
                    <Comment/>
                    <span>{getDetailPost?.comments.length}</span>
                    <span>Views: {getDetailPost?.views}</span>
                </div>

                {isMine && (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={handleToggleDropdown}
                            className="p-1 text-gray-400 hover:text-gray-600"
                        >
                            <Frame/>
                        </button>
                        <Dropdown
                            dropdownOpen={dropdownOpen}
                            handleToggleDropdown={handleToggleDropdown}
                            mode="comment"
                        >
                            <div className="px-4 py-2 text-center hover:bg-red-50">
                                <Link to={`/timeline/edit/${getDetailPost?.id}`}>수정</Link>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="block w-full px-4 py-2 text-center text-sm text-red-500 hover:bg-red-50"
                                    onClick={handleDeletePost}
                                >
                                    삭제
                                </button>
                            </div>
                        </Dropdown>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TimelineDetailCard;
