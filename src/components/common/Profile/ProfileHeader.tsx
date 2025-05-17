import useImageFallback from '@hooks/useImageFallback.tsx';
import {UserProfileResponse} from '@/types/auth.ts';

type Props = {
    mode: 'post' | 'edit' | 'none';
};

type User = Props & UserProfileResponse;

function ProfileHeader({image_url, nickname, created_at, mode = 'post'}: User) {
    const imgError = useImageFallback();
    const formattedDate = created_at?.substring(0, 10);
    return (
        <div className="mb-2 flex items-center gap-4">
            <img src={image_url} alt={nickname} className="size-[50px] rounded-full" onError={imgError}/>
            <div>
                <p>{nickname}</p>
                {mode === 'post' && <p>{formattedDate}</p>}
                {mode === 'edit' && <p>프로필 수정하기</p>}
            </div>
        </div>
    );
}

export default ProfileHeader;
