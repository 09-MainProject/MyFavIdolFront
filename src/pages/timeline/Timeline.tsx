import {useEffect, useMemo} from 'react';
import {Link, useNavigate} from 'react-router';
import ProfileHeader from '@components/common/Profile/ProfileHeader';
import ListCardSkeleton from '@components/common/Skeleton/ListCardSkeleton';
import useInfiniteObserver from '@hooks/useInfiniteObserver';
import TimelineCard from '@pages/timeline/components/Card/TimelineCard';
import useFetchPosts from '@pages/timeline/components/hooks/useFetchPosts';
import {useAuthStore} from '@store/authStore';
import performToast from '@utils/PerformToast';
import {PostListResponse} from '@/types/post.ts';

function Timeline() {
    const navigate = useNavigate();
    const {login} = useAuthStore();

    useEffect(() => {
        if (!login) {
            performToast({msg: '로그인 후 이용 가능합니다.', type: 'warning'});
            navigate('/login');
        }
    }, [login, navigate]);

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

    if (getPostError) {
        const isAuthError = (getPostError as PostListResponse)?.response?.status === 401;
        if (isAuthError) {
            performToast({msg: '로그인이 필요합니다.', type: 'error'});
            navigate('/login');
        } else {
            performToast({msg: '게시글 불러오기 실패', type: 'error'});
        }
        return null;
    }

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
