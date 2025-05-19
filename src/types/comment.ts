export type CommentListItem = {
  id: number;
  post: number;
  author: { nickname: string; name: string };
  content: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  likes_count: number;
  is_liked: string;
};

export type CommentListResponse = {
  count: number;
  next: string;
  previous: string;
  results: CommentListItem[];
};

export type CommentCreateRequest = {
  content: string;
  parentId: number;
  id?: number;
};

export type CommentResponse = {
  content: string;
};
