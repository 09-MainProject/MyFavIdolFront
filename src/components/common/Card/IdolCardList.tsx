import CardFrame from '@/components/CardFrame';
import useMobile from '@/hooks/useMobile';

type PageType = 'artist' | 'home';

type IdolArtistsCard = {
  id: number;
  name: string;
  enName: string;
  img: string;
};

type Props = {
  idolList: IdolArtistsCard[];
  onCardClick: (idol: IdolArtistsCard) => void;
  title: string;
  pageType: PageType;
};

export function IdolCardList({
  idolList,
  onCardClick,
  title,
  pageType,
}: Props) {
  const isMobile = useMobile();

  const gridClass = () => {
    if (pageType === 'artist') {
      return isMobile ? 'grid-cols-3 gap-6' : 'gap-10 grid-cols-4';
    }
    return 'grid-cols-4';
  };
  return (
    <>
      <h1 className="mb-5">{title}</h1>
      <div className={`grid gap-4 ${gridClass()}`}>
        {idolList.map(idol => (
          <CardFrame key={idol.id}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onCardClick(idol)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onCardClick(idol);
              }}
              className="cursor-pointer"
            >
              <img
                src={idol.img}
                alt={idol.name}
                className="h-auto w-full object-cover"
              />
              <div className="p-3">
                <p className="mb-1 text-[1.1rem] font-bold">{idol.name}</p>
                <p className="text-[0.9rem] text-gray-500">{idol.enName}</p>
              </div>
            </div>
          </CardFrame>
        ))}
      </div>
    </>
  );
}
