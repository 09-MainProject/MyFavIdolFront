import {useMemo} from 'react';
import {Link} from 'react-router';
import ProfileHeader from '@components/common/Profile/ProfileHeader';
import ListCardSkeleton from '@components/common/Skeleton/ListCardSkeleton.tsx';
import useFetchPosts from '@hooks/useFetchPosts';
import useInfiniteObserver from '@hooks/useInfiniteObserver';
import TimelineCard from '@pages/timeline/TimelineCard';
import {useAuthStore} from '@store/authStore';
import performToast from '@utils/PerformToast';

function Timeline() {
    const params = useMemo(() => ({ordering: '-created_at'}), []);
    const {
        getPostData,
        getPostLoading,
        getPostError,
        getUserProfileData,
        getUserProfileLoading,
        getUserProfileError,
        getPostFetchNextPage,
        getPostHasNextPage,
    } = useFetchPosts(params);
    const {login} = useAuthStore();
    const ref = useInfiniteObserver(getPostFetchNextPage, getPostHasNextPage);

    if (getPostLoading || getUserProfileLoading) return <ListCardSkeleton num={10}/>;
    if (getPostError) return performToast({msg: '게시글 불러 오기 실패', type: 'error'});
    if (getUserProfileError) return performToast({msg: '프로필 불러 오기 실패', type: 'error'});

    return (
        <section className="mt-12 px-4">
            <ul className="flex flex-col items-center gap-10">
                {getPostData.map((post) => (
                    <li key={post.id} className="w-full">
                        {getUserProfileData && (
                            <ProfileHeader
                                image_url={getUserProfileData.image_url}
                                nickname={getUserProfileData.nickname}
                                created_at={getUserProfileData.created_at}
                                mode="post"
                            />
                        )}
                        <TimelineCard
                            post={post}
                            postId={post.id}
                            likeCount={post.likes_count}
                            is_liked={post.is_liked}
                            is_deleted={post.is_deleted}
                        />
                    </li>
                ))}
            </ul>
            {login && (
                <div className="mt-12 text-center">
                    <Link
                        to="/timeline/write"
                        className="inline-block rounded bg-black px-6 py-2 text-white transition hover:bg-gray-700"
                    >
                        글 작성하기
                    </Link>
                </div>
            )}
            <div ref={ref}/>
        </section>
    );
}

export default Timeline;
