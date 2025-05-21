import {useQuery} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {api} from '@/lib/api.ts';
import ScheduleForm from './ScheduleForm.tsx';

function ScheduleCreatePage() {
    const navigate = useNavigate();

    const {data: idolListResponse, isLoading} = useQuery({
        queryKey: ['idols'],
        queryFn: () => api.get('/idols'),
    });

    if (isLoading || !idolListResponse?.data) return <div>로딩 중...</div>;

    const idols = idolListResponse?.data?.map((idol) => ({
        id: idol.id,
        name: idol.name,
    }));

    return (
        <ScheduleForm
            mode="create"
            idols={idols}
            onAfterSubmit={() => navigate('/schedule')}
        />
    );
}

export default ScheduleCreatePage;
