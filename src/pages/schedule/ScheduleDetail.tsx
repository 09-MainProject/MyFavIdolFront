import { useParams } from 'react-router';

const IDOL_DETAIL = ['#보이넥스트도어', '#보이넥스트도어'];

function ScheduleDetail() {
  const { id } = useParams();

  if (!id) return <div className="p-4">잘못된 접근입니다.</div>;

  return (
    <section className="mt-24 p-4">
      <article>
        {id}
        <h1 className="mb-20 text-xl font-bold">
          [🐦] BOYNEXTDOOR 4th EP [No Genre] 예약 구매자 대상 영상통화 팬사인회
          안내
          <a
            href="https://t.co/BV0WXb4cum"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 https://t.co/BV0WXb4cum
          </a>
          #BOYNEXTDOOR #보이넥스트도어 #BND #No_Genre
        </h1>
        <div className="flex h-[300px] max-h-[400px] items-center rounded-md border border-gray-200 p-8">
          <p>lorem ipsum</p>
        </div>
        <ul className="mt-12 flex items-center gap-4">
          {IDOL_DETAIL.map(idol => (
            <li
              key={idol}
              className="rounded-2xl border border-gray-200 p-2 text-sm font-bold"
            >
              {idol}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default ScheduleDetail;
