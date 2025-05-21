import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {api} from '@/lib/api';
import {useAuthStore} from '@/store/authStore';

// 아이돌 생성에 필요한 데이터 타입
interface IdolData {
    name: string;
    debut_date: string;
    agency: string;
    description: string;
    is_active: boolean;
}

function EditArtist() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const {accessToken} = useAuthStore.getState();
    // eslint-disable-next-line no-console
    console.log(accessToken);
    const navigate = useNavigate();
    const {id} = useParams();
    // 폼에서 입력되는 아이돌 정보 상태
    const [formIdolData, setFormIdolData] = useState<IdolData>({
        name: '',
        debut_date: '',
        agency: '',
        description: '',
        is_active: true,
    });

    // 기존 입력값 불러오기
    useEffect(() => {
        async function fetchIdolInfo() {
            try {
                const res = await api.get(`/idols${Number(id)}`);
                const {name, debut_date, agency, description, is_active} = res.data;

                setFormIdolData({
                    name,
                    debut_date,
                    agency,
                    description,
                    is_active,
                });
                // eslint-disable-next-line no-console
                console.log(res);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err);
            }
        }

        if (id) {
            fetchIdolInfo();
        }
    }, [id]);

    // form데이터 
    function setFormData(object_id: number) {
        const formData = new FormData();

        formData.append('object_type', 'idol');
        formData.append('object_id', `${object_id}`);
        formData.append('object_type', 'idol');
        formData.append('image', imageFile);
        return formData;
    }

    const handleAddIdol = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // 새로고침 방지
        try {
            const res = await api.patch(`/idols${Number(id)}`, formIdolData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                });
            const formData = setFormData(res.data.id);
            await api.post('/images/upload', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 응답 받은 데이터를 상태에 반영
            setFormIdolData({
                name: res.data.name,
                debut_date: res.data.debut_date,
                agency: res.data.agency,
                description: res.data.description,
                is_active: res.data.is_active,
            });


            navigate('/');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
    };

    // 수정 취소 버튼 함수
    function handleCancle() {
        navigate(`/artists/${id}`);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div>

                <h2 className="mb-2 text-center text-2xl font-bold">Idol 수정</h2>
                <form className="w-full max-w-md p-8 space-y-4">
                    <div className="block text-md font-medium text-gray-700">이름</div>
                    <input
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        id="name"
                        type="text"
                        value={formIdolData.name}
                        onChange={e => setFormIdolData(prev => ({...prev, name: e.target.value}))}
                    />

                    <div className="block text-md font-medium text-gray-700">데뷔일</div>
                    <input
                        id="debut_date"
                        type="date"
                        value={formIdolData.debut_date}
                        onChange={e => setFormIdolData(prev => ({...prev, debut_date: e.target.value}))}
                        className="w-full border border-gray-300 px-3 py-2 text-sm rounded"
                    />

                    <div className="block text-md font-medium text-gray-700">소속사</div>
                    <input
                        id="agency"
                        type="text"
                        value={formIdolData.agency}
                        onChange={e => setFormIdolData(prev => ({...prev, agency: e.target.value}))}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />

                    <div className="block text-md font-medium text-gray-700">소개</div>
                    <textarea
                        id="description"
                        value={formIdolData.description}
                        onChange={e => setFormIdolData(prev => ({...prev, description: e.target.value}))}
                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                    />


                    <input
                        id="profile_image"
                        type="file"
                        // value={formIdolData.profile_image}
                        onChange={e => setImageFile(e.target.files[0])}
                        className="border w-30 border-gray-300 text-sm"
                    />

                    <div className="mt-6 flex justify-center gap-2">
                        <button
                            type="submit"
                            onClick={handleCancle}
                            className="w-full font-semibold py-2 rounded bg-red-400 text-white hover:bggray800 text-sm">
                            취소
                        </button>
                        <button
                            type="submit"
                            className="w-full font-semibold py-2 rounded bg-black text-white hover:bggray800 text-sm"
                            onClick={handleAddIdol}>
                            수정 완료
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditArtist;