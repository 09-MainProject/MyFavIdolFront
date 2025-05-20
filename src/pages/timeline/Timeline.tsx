import {useMemo} from 'react';
import {Link} from 'react-router';
import ProfileHeader from '@components/common/Profile/ProfileHeader';
import ListCardSkeleton from '@components/common/Skeleton/ListCardSkeleton';
import useInfiniteObserver from '@hooks/useInfiniteObserver';
import TimelineCard from '@pages/timeline/components/Card/TimelineCard';
import useFetchPosts from '@pages/timeline/components/hooks/useFetchPosts';
import {useAuthStore} from '@store/authStore';

function Timeline() {
    const {login} = useAuthStore();

    const params = useMemo(() => ({ordering: '-created_at'}), []);
    const {
        getPostData,
        getPostLoading,
        getPostError,
        getPostFetchNextPage,
        getPostHasNextPage,
    } = useFetchPosts(params);

    const ref = useInfiniteObserver(getPostFetchNextPage, getPostHasNextPage);

    if (getPostLoading) return <ListCardSkeleton num={10}/>;
    if (getPostError) return <div>Error</div>;


    return (
        <section className="mt-12 px-4">
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
            <div ref={ref}/>
        </section>
    );
}

export default Timeline;
