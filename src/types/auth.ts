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

export type UserProfileResponse = {
    id?: number;
    name?: string;
    nickname: string;
    email?: string;
    image_url: string;
    created_at: string;
    updated_at?: string;
}
