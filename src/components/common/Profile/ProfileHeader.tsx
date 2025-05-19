type Props = {
  avatar: string;
  nickname: string;
  startDate?: string;
  mode: 'post' | 'edit' | 'none';
};

function ProfileHeader({ avatar, nickname, startDate, mode = 'post' }: Props) {
  return (
    <div className="mb-2 flex items-center gap-4">
      <img src={avatar} alt={nickname} className="size-[50px] rounded-full" />
      <div>
        <p>{nickname}</p>
        {mode === 'post' && <p>{startDate ?? '오류'}</p>}
        {mode === 'edit' && <p>프로필 수정하기</p>}
      </div>
    </div>
  );
}

export default ProfileHeader;
