import useImageFallback from '@hooks/useImageFallback.tsx';
import useImgLazy from '@hooks/useImgLazy.tsx';
import CardFrame from '@/components/CardFrame';
import useMobile from '@/hooks/useMobile';
import {useAuthStore} from '@/store/authStore';
import {IdolArtistsCard} from '@/types/idols';

// Api => Artist => IdolCardList
type PageType = 'artist' | 'home';

export type {IdolArtistsCard};

type Props = {
    idolList: IdolArtistsCard[];
    onCardClick?: (idol: IdolArtistsCard) => void;
    onDetailClick?: (scheduleId: number, idolId: number) => void;
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
    const imgError = useImageFallback();
    const imgRef = useImgLazy();
    const isMobile = useMobile();
    const {login} = useAuthStore();
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
                            onClick={() => {
                                if (pageType === 'home') {
                                    if (login) {
                                        onDetailClick?.(idol.id, idol.idolId);
                                    } else {
                                        alert('로그인이 필요합니다.');
                                    }
                                } else {
                                    onCardClick?.(idol);
                                }
                            }}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') onCardClick(idol);
                            }}
                            className="cursor-pointer"
                        >
                            {isMobile && pageType === 'home' ? (
                                <div className="flex items-center gap-3 p-3">
                                    <picture>
                                        <source srcSet={idol.img || null} type="image/webp"/>
                                        <img
                                            src=""
                                            data-src={idol.img || null}
                                            alt={idol.title}
                                            onError={imgError}
                                            ref={imgRef}
                                            className="h-[64px] w-[64px] rounded-lg object-cover"
                                        />
                                    </picture>
                                    <div>
                                        <p className="font-semibold">{idol.name}</p>
                                        <p className="text-sm text-gray-500">{idol.title}</p>
                                        <p className="text-xs text-gray-400">{idol.startDate}</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="h-[180px] overflow-hidden">
                                        <picture>
                                            <source srcSet={idol.img || null} type="image/webp"/>
                                            <img
                                                ref={imgRef}
                                                onError={imgError}
                                                src=""
                                                data-src={idol.img || null}
                                                alt={idol.name}
                                                className="h-full w-full object-cover transition-transform hover:scale-105"
                                            />
                                        </picture>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-center mb-1 text-[1.1rem] font-bold">{idol.name}</p>
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
                                            onDetailClick?.(idol.id, idol.idolId);
                                        }}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') onDetailClick?.(idol.id, idol.idolId);
                                        }}
                                        className="mt-2 mb-2 text-sm text-gray-500 cursor-pointer text-center">
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
