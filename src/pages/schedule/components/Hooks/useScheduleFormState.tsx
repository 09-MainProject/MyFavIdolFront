import React, {useMemo, useState} from 'react';
import {IdolSchedule, IdolScheduleRequest} from '@/types/idolSchedule';

function useScheduleFormState(mode: 'create' | 'edit', initialData?: IdolSchedule) {
    const defaultForm = useMemo(() => {
        if (mode === 'edit' && initialData) {
            return {
                title: initialData.title,
                description: initialData.description,
                location: initialData.location,
                start_date: initialData.start_date.slice(0, 16),
                end_date: initialData.end_date.slice(0, 16),
                idolId: initialData.idol.toString(),
            };
        }
        return {
            title: '',
            description: '',
            location: '',
            start_date: '',
            end_date: '',
            idolId: '',
        };
    }, [mode, initialData]);

    const [form, setForm] = useState<IdolScheduleRequest & { idolId: string }>(defaultForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    return {
        form,
        setForm,
        handleChange,
    };
}

export default useScheduleFormState;
