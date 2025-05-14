import React from 'react';
import {Link} from 'react-router';
import {Comment, Frame, Heart} from '@assets/icons/inedx.ts';
import Dropdown from '@components/common/Dropdown/Dropdown.tsx';
import useOutsideClick from '@hooks/useOutsideClick.tsx';
import {Idol} from '@store/idolStore.ts';

type Props = {
    idol: Idol;
    handleDeletePost: () => void;
};

function TimelineDetailCard({idol, handleDeletePost}: Props) {
    const {ref, handleToggleDropdown, dropdownOpen} =
        useOutsideClick();

    return (
        <div className="mt-8 rounded-xl bg-white">
            <img
                src={idol?.img}
                alt={idol?.name}
                className="max-h-[600px] w-full rounded-t-xl object-cover"
            />

            <p className="p-4 pt-8 text-lg text-gray-800">{idol?.description}</p>

            <div className="flex items-center justify-between border-t border-gray-200 p-4">
                <div className="flex items-center gap-6">
                    <button
                        type="button"
                        className="flex items-center gap-2 text-gray-600"
                    >
                        <Heart/>
                        <span>144</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-2 text-gray-600"
                    >
                        <Comment/>
                        <span>144</span>
                    </button>
                </div>

                <div className="relative" ref={ref}>
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
                            <Link to={`/timeline/edit/${idol?.id}`}>수정</Link>
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
            </div>
        </div>
    );
}

export default TimelineDetailCard;
