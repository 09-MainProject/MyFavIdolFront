export type PostListItem = {
  id: number;
  author: { nickname: string; name: string };
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  views: number;
  likes_count: string;
  is_liked: boolean;
  image: string;
  image_url: string;
};

export type PostListResponse = {
  count: number;
  next: string;
  previous: string;
  results: PostListItem[];
};

export type PostCreateRequest = {
  title: string;
  content: string;
  image_url: string;
  author: { nickname: string; name: string };
};

export type PostUpdateRequest = {
  title: string;
  content: string;
};

export type PostRestoreRequest = {
  author: { nickname: string; name: string };
  title: string;
  content: string;
  is_deleted: boolean;
  image_url: string;
};
