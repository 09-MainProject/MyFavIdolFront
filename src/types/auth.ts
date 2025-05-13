export type SignupRequest = {
  email: string;
  password: string;
  password_confirm: string;
  name: string;
  nickname: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
