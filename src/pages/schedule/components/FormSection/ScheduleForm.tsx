import {addDays, format} from 'date-fns';
import {useMemo} from 'react';
import Input from '@components/common/Input/Input.tsx';
import useScheduleFormState from '@pages/schedule/components/Hooks/useScheduleFormState.tsx';
import useScheduleHandlers from '@pages/schedule/components/Hooks/useScheduleHandlers.tsx';
import {IdolSchedule} from '@/types/idolSchedule.ts';

interface ScheduleFormProps {
    mode: 'create' | 'edit';
    initialData?: IdolSchedule;
    scheduleId?: string;
    onAfterSubmit?: () => void;
    idols: { id: number; name: string }[];
}

function ScheduleForm({mode, initialData, scheduleId, onAfterSubmit, idols}: ScheduleFormProps) {
    const {form, handleChange} = useScheduleFormState(mode, initialData);
    const {handleSubmit, handleDelete} = useScheduleHandlers({
        form,
        mode,
        scheduleId,
        onAfterSubmit,
    });

    const yesterday = useMemo(() => {
        const d = addDays(new Date(), -1);
        return format(d, 'yyyy-MM-dd\'T\'HH:mm');
    }, []);

    return (
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div>
                <label htmlFor="idolId" className="block text-sm font-medium text-gray-700 mb-1">
                    아이돌 선택
                    <select
                        id="idolId"
                        name="idolId"
                        value={form.idolId}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                        disabled={mode === 'edit'}
                    >
                        <option value="" disabled>
                            아이돌을 선택하세요
                        </option>
                        {idols.map((idol) => (
                            <option key={idol.id} value={idol.id}>
                                {idol.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <Input type="text" name="title" value={form.title} onChange={handleChange} label="제목" variant="lined"/>
            <Input type="text" name="description" value={form.description} onChange={handleChange} label="상세 내용"
                   variant="lined"/>
            <Input type="text" name="location" value={form.location} onChange={handleChange} label="장소"
                   variant="lined"/>
            <Input type="datetime-local" name="start_date" value={form.start_date} onChange={handleChange} label="시작 일시"
                   variant="lined" min={yesterday}/>
            <Input type="datetime-local" name="end_date" value={form.end_date} onChange={handleChange} label="종료 일시"
                   variant="lined" min={yesterday}/>

            <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-black text-white py-2 rounded"
                        onClick={() => console.log('submit')}>
                    {mode === 'edit' ? '일정 수정' : '일정 등록'}
                </button>
                {mode === 'edit' && (
                    <button type="button" onClick={handleDelete} className="flex-1 bg-red-600 text-white py-2 rounded">
                        일정 삭제
                    </button>
                )}
            </div>
        </form>
    );
}

export default ScheduleForm;
