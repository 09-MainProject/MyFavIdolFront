export type Idol = {
  id: number;
  idolId?: number;
  name: string;
  en_name?: string;
  debut_date: string;
  agency: string;
  description: string;
  profile_image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  title?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  img?: string;
};

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
