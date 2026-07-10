import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';
import PostItem from './PostItem';

function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p className="status-message">Loading posts...</p>;
  if (error) return <p className="status-message status-message--error">Error loading posts: {error.message}</p>;

  const posts = data?.posts ?? [];

  if (posts.length === 0) {
    return <p className="status-message">No posts yet. Be the first to add one!</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
