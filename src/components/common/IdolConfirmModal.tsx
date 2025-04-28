type Idol = {
  id: number;
  name: string;
};

type Props = {
  idol: Idol; // 모달에 표시할 아이돌 정보
  onConfirm: () => void; // 추가 및 삭제 버튼 클릭 시 실행할 함수
  onCancel: () => void; // 취소 버튼 클릭 시 실행할 함수
  isAlreadySelected: boolean; // 드롭다운에 아이돌의 존재 여부 확인
};

export function IdolConfirmModal({
  idol,
  onConfirm,
  onCancel,
  isAlreadySelected,
}: Props) {
  return (
    <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-[300px] rounded-lg bg-white p-6 shadow-lg">
        <p className="mb-4 text-center text-lg font-semibold">
          {isAlreadySelected
            ? `${idol.name}을(를) 삭제하시겠습니까?`
            : `${idol.name}을(를) 추가하시겠습니까?`}
        </p>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-gray-300 px-4 py-2"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            {isAlreadySelected ? '삭제' : '추가'}
          </button>
        </div>
      </div>
    </div>
  );
}
