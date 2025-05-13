import {Link} from 'react-router';
import CardFrame from '@components/CardFrame';
import ProfileHeader from '@components/common/Profile/ProfileHeader';
import TimelineCard from '@pages/timeline/TimelineCard.tsx';
import {useTimelineStore} from '@store/useTimelineStore.ts';

function Timeline() {
    const {posts} = useTimelineStore();

    return (
        <section className="mt-12 p-4">
            <ul className="grid grid-cols-1 place-items-center items-center gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {posts.map(idol => (
                    <li key={idol.id} className="w-full max-w-[300px]">
                        <article>
                            <ProfileHeader
                                avatar={idol.img}
                                nickname={idol.name}
                                mode="post"
                                startDate={idol.startDate}
                            />
                            <CardFrame>
                                <TimelineCard idol={idol}/>
                            </CardFrame>
                        </article>
                    </li>
                ))}
            </ul>
            <div className="mt-12 text-center">
                <Link
                    to="/timeline/write"
                    className="inline-block rounded bg-black px-6 py-2 text-white transition hover:bg-gray-700"
                >
                    글 작성하기
                </Link>
            </div>
        </section>
    );
}

export default Timeline;
