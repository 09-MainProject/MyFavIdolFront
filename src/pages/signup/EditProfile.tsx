import { Link } from 'react-router-dom';

function EditProfile() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-4 pt-10">
      <div className="w-full max-w-3xl space-y-8">
        {/* 경로 안내 */}
        <div className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">{'>'}</span>
          <span className="font-semibold text-black">프로필</span>
        </div>

        {/* 프로필 영역 */}
        <div className="flex items-center">
          <div className="h-20 w-20 rounded-full bg-gray-300" />
          <div className="ml-4">
            <p className="text-lg font-semibold">리센느</p>
            <button type='submit' className="mt-1 text-sm text-gray-500" disabled>
              프로필 수정하기
            </button>
          </div>
        </div>

        {/* 닉네임 변경 */}
        <div>
          <h3 className="mb-2 text-base font-semibold">닉네임 변경하기</h3>
          <input
            type="text"
            placeholder="변경하고 싶은 닉네임을 입력해주세요."
            className="w-full rounded border px-3 py-2 text-sm"
          />
        </div>

        {/* 비밀번호 변경 */}
        <div>
          <h3 className="mb-2 text-base font-semibold">비밀번호 변경하기</h3>
          <div className="space-y-2">
            <input
              type="password"
              placeholder="기존 비밀번호를 입력해주세요."
              className="w-full rounded border px-3 py-2 text-sm"
            />
            <input
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              className="w-full rounded border px-3 py-2 text-sm"
            />
            <input
              type="password"
              placeholder="비밀번호 확인을 입력해주세요."
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* 알람 변경 */}
        <div>
          <h3 className="mb-2 text-base font-semibold">알람 변경하기</h3>

          {/* label -> div로 수정 (eslint오류나서) */}
          <div className="text-sm text-gray-400">알림 동의 on/off</div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
