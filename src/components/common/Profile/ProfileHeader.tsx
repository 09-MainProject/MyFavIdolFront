import useImageFallback from '@hooks/useImageFallback.tsx';
import useImgLazy from '@hooks/useImgLazy.tsx';
import {UserProfileResponse} from '@/types/auth.ts';

type Props = {
    mode: 'post' | 'edit' | 'none';
};

type User = Props & UserProfileResponse;

function ProfileHeader({image_url, nickname, created_at, mode = 'post'}: User) {
    const imgError = useImageFallback();
    const imgRef = useImgLazy();
    const formattedDate = created_at?.substring(0, 10);
    return (
        <div className="pb-3 flex items-center gap-4">
            <picture>
                <source srcSet={image_url} type="image/webp"/>
                <img ref={imgRef} src={image_url} alt={nickname} className="size-[42px] rounded-full"
                     onError={imgError}/>
            </picture>
            <div>
                <p className="text-sm">{nickname}</p>
                {mode === 'post' && <p className="text-sm">{formattedDate}</p>}
                {mode === 'edit' && <p>프로필 수정하기</p>}
            </div>
        </div>
    );
}

export default ProfileHeader;
