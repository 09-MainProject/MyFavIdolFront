import CardFrame from '@/components/CardFrame';
import useMobile from '@/hooks/useMobile';

// Api => Artist => IdolCardList
type PageType = 'artist' | 'home';

export interface IdolArtistsCard {
  id: number;
  // idolId: number;
  title: string;
  img: string;
  // type: string;
  startDate: string;
  // endDate: string;
  // location: string;
  // description: string;
  name: string;
  // enName: string;
}

type Props = {
  idolList: IdolArtistsCard[];
  onCardClick?: (idol: IdolArtistsCard) => void;
  onDetailClick?: (idolId: number) => void;
  idolTitle?: string;
  pageType: PageType;
  isVertical: boolean;
};

export function IdolCardList({
  idolList,
  onCardClick,
  onDetailClick,
  idolTitle,
  pageType,
  isVertical,
}: Props) {
  const isMobile = useMobile();

  const gridClass = () => {
    if (isMobile) {
      return isVertical ? 'flex items-center gap-3 p-3' : 'grid-cols-3 gap-6';
    }
    return 'grid-cols-4';
  };
  return (
    <>
      <h1 className="mb-5">{idolTitle}</h1>
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
              {isMobile && pageType === 'home' ? (
                <div className="flex items-center gap-3 p-3">
                  <img
                    src={idol.img}
                    alt={idol.title}
                    className="h-[64px] w-[64px] rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{idol.name}</p>
                    <p className="text-sm text-gray-500">{idol.title}</p>
                    <p className="text-xs text-gray-400">{idol.startDate}</p>
                  </div>
                </div>
              ) : (
                  <>
                    <div className='h-[180px] overflow-hidden'>
                      <img
                        src={idol.img}
                        alt={idol.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  <div className="p-3">
                    <p className="text-center mb-1 text-[1.1rem] font-bold">{idol.name}</p>
                    {/* {pageType === 'artist' && (
                      <p className="text-[0.9rem] text-gray-500">
                        {idol.enName}
                      </p>
                    )} */}
                    {idol.title && (
                      <p className="text-[0.9rem] text-gray-500">
                        {idol.title}
                      </p>
                    )}
                    {idol.startDate && (
                      <p className="text-[0.8rem] text-gray-500">
                        {idol.startDate}
                      </p>
                      )}
                    </div>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                      e.stopPropagation();
                      onDetailClick?.(idol.id);
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') onDetailClick?.(idol.id);
                      }}
                      className='mt-2 mb-2 text-sm text-gray-500 cursor-pointer text-center'>
                      상세정보
                    </div>
                </>
              )}
            </div>
          </CardFrame>
        ))}
      </div>
    </>
  );
}
