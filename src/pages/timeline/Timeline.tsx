import {useMemo} from 'react';
import {Link} from 'react-router';
import ProfileHeader from '@components/common/Profile/ProfileHeader';
import ListCardSkeleton from '@components/common/Skeleton/ListCardSkeleton.tsx';
import useFetchPosts from '@hooks/useFetchPosts';
import useInfiniteObserver from '@hooks/useInfiniteObserver';
import TimelineCard from '@pages/timeline/components/Cards/TimelineCard.tsx';
import {useAuthStore} from '@store/authStore';
import performToast from '@utils/PerformToast';

function Timeline() {
    const params = useMemo(() => ({ordering: '-created_at'}), []);
    const {
        getPostData,
        getPostLoading,
        getPostError,
        getPostFetchNextPage,
        getPostHasNextPage,
    } = useFetchPosts(params);
    const {login} = useAuthStore();
    const ref = useInfiniteObserver(getPostFetchNextPage, getPostHasNextPage);

    if (getPostLoading && !getPostData.length) {
        return <ListCardSkeleton num={10}/>;
    }
    
    if (getPostError) {
        performToast({msg: '게시글을 불러오는데 실패했습니다. 다시 시도해주세요.', type: 'error'});
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">게시글을 불러오는데 실패했습니다.</p>
            </div>
        );
    }

    return (
        <section className="mt-12 px-4">
            {getPostData.length === 0 ? (
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-gray-500">아직 게시글이 없습니다.</p>
                </div>
            ) : (
                <ul className="flex flex-col items-center gap-10">
                    {getPostData.map((post) => (
                        <li key={post.id} className="w-full">
                            <ProfileHeader
                                image_url={post.image_url}
                                nickname={post.author}
                                created_at={post.created_at}
                                mode="post"
                            />
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
            )}
            {login && (
                <div className="fixed bottom-24 right-8 z-10">
                    <Link
                        to="/timeline/write"
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black text-white text-2xl shadow-lg transition hover:bg-gray-700"
                    >
                        +
                    </Link>
                </div>
            )}
            <div ref={ref} className="h-4"/>
        </section>
    );
}

export default Timeline;
