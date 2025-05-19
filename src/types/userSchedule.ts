export type UserSchedule = {
  user_schedule_id: number;
};

export type UserScheduleResponse = {
  schedule_id: number;
  idol_id: number;
  idol_name: string;
  title: string;
  location: string;
  profile_image: string;
};

export type UserScheduleCreateRequest = {
  schedule_id: number;
  idol_id: number;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};
