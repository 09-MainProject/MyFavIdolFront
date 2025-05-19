export type Like = {
  app_label: string;
  object_id: string;
  data?: { content_type: string; object_id: string };
};
export type LikeResponse = {
  id: number;
  content_type: number;
  object_id: number;
  user: number;
  created_at: string;
};
