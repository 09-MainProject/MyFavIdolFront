import {Link} from 'react-router';
import CardFrame from '@components/CardFrame';
import ProfileHeader from '@components/common/Profile/ProfileHeader';
import useFetchPosts from '@hooks/useFetchPosts';
import TimelineCard from '@pages/timeline/TimelineCard';
import {useAuthStore} from '@store/authStore';

function Timeline() {
    const {
        getPostData,
        getPostLoading,
        getPostError,
        getUserProfileData,
        getUserProfileLoading,
        getUserProfileError
    } = useFetchPosts();
    const {login} = useAuthStore();

    if (getPostLoading) return <p>로딩 중...</p>;
    if (getPostError) return <p>오류가 발생했습니다.</p>;
    if (getUserProfileLoading) return <p>로딩 중...</p>;
    if (getUserProfileError) return <p>오류가 발생했습니다.</p>;

    return (
        <section className="mt-12 p-4">
            <ul className="grid grid-cols-1 place-items-center items-center gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {getPostData.map(post => (
                    <li key={post.id} className="w-full max-w-[300px]">
                        {getUserProfileData && (
                            <ProfileHeader
                                image_url={getUserProfileData.image_url}
                                nickname={getUserProfileData.nickname}
                                created_at={getUserProfileData.created_at}
                                mode="post"
                            />
                        )}
                        <article>
                            <CardFrame>
                                <TimelineCard post={post} postId={post.id} likeCount={post.likes_count}
                                              is_liked={post.is_liked} is_deleted={post.is_deleted}/>
                            </CardFrame>
                        </article>
                    </li>
                ))}
            </ul>
            {
                login &&
                <div className="mt-12 text-center">
                    <Link
                        to="/timeline/write"
                        className="inline-block rounded bg-black px-6 py-2 text-white transition hover:bg-gray-700"
                    >
                        글 작성하기
                    </Link>
                </div>
            }
        </section>
    );
}

export default Timeline;
