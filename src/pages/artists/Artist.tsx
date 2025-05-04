/*
리펙토링 순서
1. 전체 아이돌리스트와 팔로우한 아이돌 리스트의 겹쳐지는 코드 부분을 따로 IdolCardList.tsx에 넣기위한 생성
2. props 설계 : idolList, title, onCardClick
3. 카드 클릭 시 onCardClick(item) 실행
4. Artists에서 기존 idols.map, allIdolList.map 제거하고 IdolCardList로 교체
*/
import { useState } from 'react';
import { useNavigate } from 'react-router';
// import CardFrame from '@/components/CardFrame';
import { IdolCardList } from '@/components/common/Card/IdolCardList';
import { IdolConfirmModal } from '@/components/common/IdolConfirmModal';
import { useIdolState } from '@/store/idolStore';

function Artist() {
  const {
    idols, // 팔로우 되어있는 아이돌 리스트
    selectedIdolId, // 선택된 아이돌 Id
    addIdol, // 아이돌을 드롭다운에 추가하는 함수
    removeIdol, // 아이돌을 드롭다운에서 제거하는 함수
  } = useIdolState();

  // 모달창 아이돌 초기 값 null
  const [modalIdol, setModalIdol] = useState(null);

  // 추가 후 home으로 이동하기 위한 navigate
  const navigate = useNavigate();

  const selectedIdol = idols.find(idol => idol.id === selectedIdolId);
  // eslint-disable-next-line no-console
  console.log(selectedIdol);

  const handleConfirm = () => {
    if (!modalIdol) return;

    // 현재 아이돌이 드롭다운(idols)에 존재하는지 확인
    // idols에 즉 팔로우 되어있는 아이돌 리스트에 선택된 아이돌 id와 modal의 id 비교
    const isSelected = idols.some(idol => idol.id === modalIdol.id);

    // 만약 dropdown 에 있는 아이돌이라면 삭제 함수
    if (isSelected) {
      removeIdol(modalIdol.id);
    } else {
      // dropdown에 없다면 추가 후 home으로 이동
      addIdol(modalIdol);
      navigate('/');
    }

    // 모달 닫기 !
    setModalIdol(null);
  };

  const allIdolList = [
    {
      id: 4,
      idolId: 2,
      title: '방탄소년단 팬사인회!',
      type: '팬사인회',
      startDate: '2025-05-03',
      endDate: '2025-05-03',
      location: '서울 코엑스',
      description: '2025년 상반기 뉴진스 팬사인회',
      img: '../src/assets/img/ncity.jpeg',
      name: '방탄소년단',
      enName: 'bts',
    },
    {
      id: 5,
      idolId: 3,
      title: '레드벨벳 월드투어',
      type: '공연',
      startDate: '2025-05-10',
      endDate: '2025-05-10',
      location: '대구 스타디움',
      description: 'Red Velvet WORLD TOUR FOLLOW AGAIN',
      img: '../src/assets/img/ncity.jpeg',
      name: '레드벨벳',
      enName: 'redvelvet',
    },
    {
      id: 6,
      idolId: 4,
      title: '아이브 음악방송 출연',
      type: '방송',
      startDate: '2025-05-18',
      endDate: '2025-05-18',
      location: 'KBS 여의도',
      description: '뮤직뱅크 생방송 출연',
      img: '../src/assets/img/ncity.jpeg',
      name: '아이브',
      enName: 'ive',
    },
  ];

  return (
    <div className="mx-auto max-w-[1080px]">
      <div className="mt-20 px-4 md:px-8">
        <div className="text-center text-4xl font-bold">
          <h1>{allIdolList.length}팀의 아티스트들을</h1>
          <h1>Wistar에서 만나볼 수 있어요!</h1>
        </div>
        <div className="mt-20 text-2xl font-bold">
          <IdolCardList
            title={`팔로우한 ${idols.length}팀의 아티스트`}
            idolList={idols}
            onCardClick={setModalIdol}
            pageType="artist"
          />
        </div>
        <div className="mt-20 text-2xl font-bold">
          <IdolCardList
            title="전체 아티스트 페이지"
            idolList={allIdolList}
            onCardClick={setModalIdol}
            pageType="artist"
          />
        </div>
        {modalIdol && ( // modalIdol 값이 존재할 때만 모달 컴포넌트 렌더링
          <IdolConfirmModal
            idol={modalIdol} // 모달창에 쓰여지는 아이돌 이름을 모달컴포넌트로 props로 전달
            onConfirm={handleConfirm} // '추가' 또는 '삭제' 버튼 클릭 시 handleConfirm함수 실행
            onCancel={() => setModalIdol(null)} // 취소 버튼 클릭 시 모달 닫음
            isAlreadySelected={idols.some(
              // 현재 선택된 아이돌이 드롭다운 목록에 존재하는지 여부 확인
              i => i.id === modalIdol.id
            )}
          />
        )}
      </div>
    </div>
  );
}

export default Artist;
