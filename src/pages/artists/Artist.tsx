/*
1. 전체 아티스트 목록들이 보여짐
1-1. 전체 아티스트들 allIdolList로 배열에 map메서드를 사용하여 접근 후 불러옴 
2. 팔로우한 아티스트들은 임시로 store에서 가져옴
2-1. 이 때 artist 페이지 최 상단에는 드롭다운에 추가된 아티스트 카드 목록들이 있어야 함
2-2. store에서 드롭다운 박스에 추가 또는 삭제하는 함수를 가져옴
3. 아이돌마다 모달창에 OOO를 추가할건지 상태 변화를 위해 state 선언
4. 추가할 아티스트 클릭하면 모달창으로 드롭다운에 추가할지 말지
5. 카드 클릭 시 팔로우 되어있는 아이돌 리스트 즉, idols의 객체가 모달창에 표시된 아이돌에 값을 넣어주고 그 값을 isSelected라는 변수로 지정
5-1. isSelected 라는 변수가 true이면 즉 팔로우 한 아이돌이라면 삭제 함수를 호출 아니면 추가 함수를 호출
*/

import { useState } from 'react';
import { useNavigate } from 'react-router';
import CardFrame from '@/components/CardFrame';
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

    // 모달 닫기
    setModalIdol(null);
  };

  const allIdolList = [
    {
      id: 4,
      idolId: 2,
      title: '방탄소년단 팬사인회',
      type: '팬사인회',
      startDate: '2025-05-03',
      endDate: '2025-05-03',
      location: '서울 코엑스',
      description: '2025년 상반기 뉴진스 팬사인회',
      img: '../src/assets/img/bts.jpg',
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
      img: '../src/assets/img/redvelvet.jpg',
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
      img: '../src/assets/img/ive.jpg',
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
          <h1 className="mb-5">팔로우한 {idols.length}팀의 아티스트</h1>
          <div className="grid gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-4 md:gap-10">
            {idols.map(item => (
              <CardFrame key={item.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setModalIdol(item)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') setModalIdol(item);
                  }}
                  className="cursor-pointer"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-auto w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="mb-1 text-[1.1rem] font-bold">{item.name}</p>
                    <p className="text-[0.9rem] text-gray-500">{item.enName}</p>
                  </div>
                </div>
              </CardFrame>
            ))}
          </div>
        </div>
        <div className="mt-20">
          <h1 className="text-2xl font-bold">전체 아티스트 리스트</h1>
          <div className="mt-5 grid gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-4 md:gap-10">
            {allIdolList.map(item => (
              <CardFrame key={item.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setModalIdol(item)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') setModalIdol(item);
                  }}
                  className="cursor-pointer"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-auto w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="mb-1 text-[1.1rem] font-bold">{item.name}</p>
                    <p className="text-[0.9rem] text-gray-500">{item.enName}</p>
                  </div>
                </div>
              </CardFrame>
            ))}
          </div>
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
