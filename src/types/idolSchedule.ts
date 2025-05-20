export type IdolSchedule = {
    id: number;
    idol_name: string;
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    user: number;
    idol: number;
}

export type IdolScheduleRequest = {
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
}


export type IdolScheduleCreateResponse = {
    data: IdolSchedule[]
}


export type IdolScheduleDetailResponse = {
    data: {
        schedule_view: IdolSchedule;
    };
};

