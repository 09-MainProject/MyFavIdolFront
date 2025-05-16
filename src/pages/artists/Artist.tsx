import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { IdolCardList } from '@/components/common/Card/IdolCardList';
import type { IdolArtistsCard } from '@/components/common/Card/IdolCardList';
import { IdolConfirmModal } from '@/components/common/IdolConfirmModal';
import { api } from '@/lib/api';
import { useIdolState } from '@/store/idolStore';

// 백엔드 받아오는 아이돌 정보 인터페이스
interface Idol {
  id: number;
  name: string;
  img: string;
  isVertical: boolean;
}

function Artist() {
  // 전체 아이돌 리스트 상태
  const [idolList, setIdolList] = useState<Idol[]>([]);
  // 팔로우 아이돌 리스트 상태
  const [followIdols, setFollowIdols] = useState<IdolArtistsCard[]>([]);
  // 아이돌 생성
  // const [newIdol, setNewIdol] = useState<Idol[]>([]);
  
  // 전체 아이돌 리스트 api 요청
  useEffect(() => {
    async function fetchIdolList() {
      try {
        const resIdolList = await api.get('/idols');
        // eslint-disable-next-line no-console
        console.log('전체 데이터 :', resIdolList.data);
        // 응답 데이터를 map 메서드를 통해 분해
        setIdolList(
          resIdolList.data.map(
            (item: {
              id: number;
              name: string;
              image_url: string;
            }) => ({
              // api로 받은 아이돌 구조
              id: item.id,
              name: item.name,
              img: item.image_url,
            })
          )
        );
        // console.log(idolList.map(item => item));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    fetchIdolList();
  }, []);

  // 팔로우 아이돌 api 요청
  useEffect(() => {
    async function fetchFollowIdols() {
      // try {
      //   const resFollow = await axios.get(
      //     'http://43.203.181.6/api/idols/follows_idols/'
      //   );
      //   setFollowIdols(resFollow.data.followed_idols);
      // } catch (error) {
      //   console.error(error);
      // }
    }
    fetchFollowIdols();
  }, []);

  const {
    selectedIdolId, // 선택된 아이돌 Id
    setSelectIdol,
  } = useIdolState();

  // 모달창 아이돌 초기 값 null
  const [modalIdol, setModalIdol] = useState(null);

  // 추가 후 home으로 이동하기 위한 navigate
  const navigate = useNavigate();

  const selectedIdol = idolList?.find(idol => idol.id === selectedIdolId);
  // eslint-disable-next-line no-console
  console.log(selectedIdol);

  const handleConfirm = async () => {
    if (!modalIdol) return;

    // 팔로우 상태 확인
    const res = await api.get(
      `/idols/${modalIdol.id}/follow-status/`
    );
    const isFollowed = res.data.is_following;

    if (isFollowed) {
      // 팔로우 된 경우 팔로우 취소 요청
      await api.delete(
        `/idols/${modalIdol.id}/follows/`
      );
      // 상태에서 제거
      setFollowIdols(prev => prev.filter(idol => idol.id !== modalIdol.id));
    } else {
      // 팔로우 되지 않은 경우 팔로우 추가 요청
      await api.post(
        `/idols/${modalIdol.id}/follows/`
      );
      setFollowIdols(prev => [...prev, modalIdol]);

      navigate('/');
    }
    // 모달 닫기 !
    setModalIdol(null);
  };

  return (
    <div>
      <button onClick={() => navigate('/artists/create')} type='button'>
        추가
      </button>
      <div className="mx-auto max-w-[1080px]">
        <div className="mt-20 px-4 md:px-8">
          <div className="text-center text-4xl font-bold">
            <h1>{idolList.length}팀의 아티스트들을</h1>
            <h1>Wistar에서 만나볼 수 있어요!</h1>
          </div>
          <div className="mt-20 text-2xl font-bold">
            <IdolCardList
              idolTitle={`팔로우한 ${followIdols.length}팀의 아티스트`}
              idolList={followIdols}
              // onCardClick={setModalIdol}
              onCardClick={idol => {
                setModalIdol(idol);
                setSelectIdol(idol.id);
              }}
              pageType="artist"
              isVertical={false}
            />
          </div>
          <div className="mt-20 text-2xl font-bold">
            <IdolCardList
              idolTitle="전체 아티스트 페이지"
              idolList={idolList}
              // onCardClick={setModalIdol}
              onCardClick={idol => {
                setModalIdol(idol);
                setSelectIdol(idol.id);
              }}
              pageType="artist"
              isVertical={false}
              onDetailClick={(idolId)=> navigate(`/artists/${idolId}`)}
            />
          </div>
          {modalIdol && ( // modalIdol 값이 존재할 때만 모달 컴포넌트 렌더링
            <IdolConfirmModal
              idol={modalIdol} // 모달창에 쓰여지는 아이돌 이름을 모달컴포넌트로 props로 전달
              onConfirm={handleConfirm} // '추가' 또는 '삭제' 버튼 클릭 시 handleConfirm함수 실행
              onCancel={() => setModalIdol(null)} // 취소 버튼 클릭 시 모달 닫음
              isAlreadySelected={followIdols.some(
                // 현재 선택된 아이돌이 드롭다운 목록에 존재하는지 여부 확인
                i => i.id === modalIdol.id
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Artist;
