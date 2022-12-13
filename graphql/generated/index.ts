import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  post: Post;
  post_id: Scalars['Int'];
  profile: Profile;
  profile_id: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comment?: Maybe<Comment>;
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['Int'];
  post: Post;
  post_id: Scalars['Int'];
  profile: Profile;
  profile_id: Scalars['Int'];
};

export type LikeResponse = {
  __typename?: 'LikeResponse';
  like?: Maybe<Like>;
};

export type LoggedInUser = {
  __typename?: 'LoggedInUser';
  email: Scalars['String'];
  id: Scalars['ID'];
  profile?: Maybe<Profile>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentResponse;
  createPost: Post;
  createProfile: Profile;
  createUser: User;
  likePost: LikeResponse;
  login: SigninResponse;
  unlikePost: PostResponse;
};


export type MutationCreateCommentArgs = {
  comment: Scalars['String'];
  post_id: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  description: Scalars['String'];
  image_url: Scalars['String'];
};


export type MutationCreateProfileArgs = {
  bio: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  profile_id: Scalars['Int'];
};


export type MutationLikePostArgs = {
  post_id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUnlikePostArgs = {
  like_id: Scalars['Int'];
  post_id: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  image_url: Scalars['String'];
  likes: Array<Like>;
  profile: Profile;
  profile_id: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  post?: Maybe<Post>;
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  post: Array<Post>;
  private: Scalars['Boolean'];
  user: User;
  user_id: Scalars['Int'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  currentUser?: Maybe<LoggedInUser>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  profile: Profile;
  profiles: Array<Profile>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryCommentsArgs = {
  post_id: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryProfileArgs = {
  me?: InputMaybe<Scalars['Boolean']>;
  username: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  error?: Maybe<Scalars['String']>;
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  user: User;
};

export type SignupResponse = {
  __typename?: 'SignupResponse';
  error?: Maybe<Scalars['String']>;
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  profile?: Maybe<Profile>;
  profile_id?: Maybe<Scalars['Int']>;
};

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, createdAt: string, description: string, image_url: string, profile: { __typename?: 'Profile', id: number, username: string }, likes: Array<{ __typename?: 'Like', id: number, profile_id: number }> }> };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', description: string, image_url: string, profile_id: number } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'LoggedInUser', id: string, email: string, profile?: { __typename?: 'Profile', id: number, name: string, bio: string, username: string, private: boolean } | null } | null };

export type CommentsQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: number, comment: string, createdAt: string, profile: { __typename?: 'Profile', id: number, username: string } }> };

export type ProfileQueryVariables = Exact<{
  username: Scalars['String'];
  me?: InputMaybe<Scalars['Boolean']>;
}>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Profile', id: number, name: string, username: string, bio: string, post: Array<{ __typename?: 'Post', id: number, image_url: string }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'SigninResponse', token: string } };

export type CreatePostMutationVariables = Exact<{
  description: Scalars['String'];
  image_url: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, profile_id: number, description: string, image_url: string } };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'LikeResponse', like?: { __typename?: 'Like', id: number } | null } };

export type UnlikePostMutationVariables = Exact<{
  postId: Scalars['Int'];
  likeId: Scalars['Int'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: number } | null } };

export type CreateCommentMutationVariables = Exact<{
  comment: Scalars['String'];
  postId: Scalars['Int'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentResponse', comment?: { __typename?: 'Comment', comment: string } | null } };


export const PostsDocument = `
    query Posts {
  posts {
    id
    createdAt
    description
    image_url
    profile {
      id
      username
    }
    likes {
      id
      profile_id
    }
  }
}
    `;
export const usePostsQuery = <
      TData = PostsQuery,
      TError = unknown
    >(
      variables?: PostsQueryVariables,
      options?: UseQueryOptions<PostsQuery, TError, TData>
    ) =>
    useQuery<PostsQuery, TError, TData>(
      variables === undefined ? ['Posts'] : ['Posts', variables],
      fetcher<PostsQuery, PostsQueryVariables>(PostsDocument, variables),
      options
    );
export const PostDocument = `
    query Post($id: Int!) {
  post(id: $id) {
    description
    image_url
    profile_id
  }
}
    `;
export const usePostQuery = <
      TData = PostQuery,
      TError = unknown
    >(
      variables: PostQueryVariables,
      options?: UseQueryOptions<PostQuery, TError, TData>
    ) =>
    useQuery<PostQuery, TError, TData>(
      ['Post', variables],
      fetcher<PostQuery, PostQueryVariables>(PostDocument, variables),
      options
    );
export const CurrentUserDocument = `
    query CurrentUser {
  currentUser {
    id
    email
    profile {
      id
      name
      bio
      username
      private
    }
  }
}
    `;
export const useCurrentUserQuery = <
      TData = CurrentUserQuery,
      TError = unknown
    >(
      variables?: CurrentUserQueryVariables,
      options?: UseQueryOptions<CurrentUserQuery, TError, TData>
    ) =>
    useQuery<CurrentUserQuery, TError, TData>(
      variables === undefined ? ['CurrentUser'] : ['CurrentUser', variables],
      fetcher<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, variables),
      options
    );
export const CommentsDocument = `
    query Comments($postId: Int!) {
  comments(post_id: $postId) {
    id
    comment
    createdAt
    profile {
      id
      username
    }
  }
}
    `;
export const useCommentsQuery = <
      TData = CommentsQuery,
      TError = unknown
    >(
      variables: CommentsQueryVariables,
      options?: UseQueryOptions<CommentsQuery, TError, TData>
    ) =>
    useQuery<CommentsQuery, TError, TData>(
      ['Comments', variables],
      fetcher<CommentsQuery, CommentsQueryVariables>(CommentsDocument, variables),
      options
    );
export const ProfileDocument = `
    query Profile($username: String!, $me: Boolean) {
  profile(username: $username, me: $me) {
    id
    name
    username
    bio
    post {
      id
      image_url
    }
  }
}
    `;
export const useProfileQuery = <
      TData = ProfileQuery,
      TError = unknown
    >(
      variables: ProfileQueryVariables,
      options?: UseQueryOptions<ProfileQuery, TError, TData>
    ) =>
    useQuery<ProfileQuery, TError, TData>(
      ['Profile', variables],
      fetcher<ProfileQuery, ProfileQueryVariables>(ProfileDocument, variables),
      options
    );
export const LoginDocument = `
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
export const CreatePostDocument = `
    mutation CreatePost($description: String!, $image_url: String!) {
  createPost(description: $description, image_url: $image_url) {
    id
    profile_id
    description
    image_url
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['CreatePost'],
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables)(),
      options
    );
export const LikePostDocument = `
    mutation LikePost($postId: Int!) {
  likePost(post_id: $postId) {
    like {
      id
    }
  }
}
    `;
export const useLikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LikePostMutation, TError, LikePostMutationVariables, TContext>) =>
    useMutation<LikePostMutation, TError, LikePostMutationVariables, TContext>(
      ['LikePost'],
      (variables?: LikePostMutationVariables) => fetcher<LikePostMutation, LikePostMutationVariables>(LikePostDocument, variables)(),
      options
    );
export const UnlikePostDocument = `
    mutation UnlikePost($postId: Int!, $likeId: Int!) {
  unlikePost(post_id: $postId, like_id: $likeId) {
    post {
      id
    }
  }
}
    `;
export const useUnlikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UnlikePostMutation, TError, UnlikePostMutationVariables, TContext>) =>
    useMutation<UnlikePostMutation, TError, UnlikePostMutationVariables, TContext>(
      ['UnlikePost'],
      (variables?: UnlikePostMutationVariables) => fetcher<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument, variables)(),
      options
    );
export const CreateCommentDocument = `
    mutation CreateComment($comment: String!, $postId: Int!) {
  createComment(comment: $comment, post_id: $postId) {
    comment {
      comment
    }
  }
}
    `;
export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>) =>
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      ['CreateComment'],
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables)(),
      options
    );