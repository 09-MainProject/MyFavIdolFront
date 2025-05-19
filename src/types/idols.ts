export type IdolResponseType = {
  id: number;
  name: string;
  debut_date: string;
  agency: string;
  description: string;
  profile_image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type UpdateIdolRequest = {
  name: string;
  debut_date: string;
  agency: string;
  description: string;
  profile_image: string;
  is_active: boolean;
};
