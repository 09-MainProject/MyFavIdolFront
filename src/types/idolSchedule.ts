export type IdolScheduleRequest = {
  idol_id: number;
  schedule_id?: number;
};

export type IdolScheduleResponse = {
  schedule_id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  idol_id: number;
  idol_name: string;
};

export type IdolScheduleCreateResponse = {
  schedule_id: number;
  idol_id: number;
  date: string;
  title: string;
  description: string;
  location: string;
  created_at: string;
  updated_at: string;
};
