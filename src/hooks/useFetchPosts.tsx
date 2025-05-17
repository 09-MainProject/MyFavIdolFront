import {useQuery} from '@tanstack/react-query';
import {getPostsApi} from '@api/timeline/getPosts.ts';
import {getUserProfileApi} from '@api/user/getUser.ts';
import {UserProfileResponse} from '@/types/auth.ts';
import {PostListItem, PostListResponse} from '@/types/post.ts';

function UseFetchPosts() {
    const getPost = useQuery<PostListResponse, Error>({
        queryKey: ['posts'],
        queryFn: () => getPostsApi(),
    });

    const getUserProfile = useQuery<UserProfileResponse, Error>({
        queryKey: ['userProfile'],
        queryFn: () => getUserProfileApi(),
    });

    const postList: PostListItem[] = getPost.data?.results ?? [];
    return {
        getUserProfileData: getUserProfile.data,
        getUserProfileLoading: getUserProfile.isLoading,
        getUserProfileError: getUserProfile.isError,
        getPostData: postList,
        getPostLoading: getPost.isLoading,
        getPostError: getPost.isError
    };
}

export default UseFetchPosts;