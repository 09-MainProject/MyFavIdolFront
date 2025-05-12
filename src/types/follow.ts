export type FollowList = {
  idol_id: number;
  idol_name: string;
  profile_image: string;
};

export type FollowResponse = {
  followed_idols: FollowList[];
};

export type FollowCreateRequest = {
  idol_id: number;
};

export type FollowCheckedResponse = {
  idol_id: number;
  is_followed: boolean;
};
