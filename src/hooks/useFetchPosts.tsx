import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {getPostsApi} from '@api/timeline/getPosts.ts';
import {getUserProfileApi} from '@api/user/getUser.ts';
import {UserProfileResponse} from '@/types/auth.ts';
import {PostListItem, PostListRequest, PostListResponse} from '@/types/post.ts';

function UseFetchPosts(params: Omit<PostListRequest, 'page'>) {
    const getPost = useInfiniteQuery<PostListResponse, Error>({
        queryKey: ['posts', params],
        queryFn: ({pageParam = 1}) => getPostsApi({
            page: pageParam,
            ...params
        }),
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const url = new URL(lastPage.next);
            return Number(url.searchParams.get('page'));
        },
        initialPageParam: 1
    });

    const getUserProfile = useQuery<UserProfileResponse, Error>({
        queryKey: ['userProfile'],
        queryFn: () => getUserProfileApi(),
    });

    const postList: PostListItem[] = getPost.data?.pages.reduce((acc, cur) => [...acc, ...cur.results], []) ?? [];

    return {
        getUserProfileData: getUserProfile.data,
        getUserProfileLoading: getUserProfile.isLoading,
        getUserProfileError: getUserProfile.isError,
        getPostData: postList,
        getPostLoading: getPost.isLoading,
        getPostFetchNextPage: getPost.fetchNextPage,
        getPostHasNextPage: getPost.hasNextPage,
        getPostError: getPost.isError
    };
}

export default UseFetchPosts;