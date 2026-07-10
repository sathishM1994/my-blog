import React from 'react';

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function PostItem({ post }) {
  return (
    <article className="post-card">
      <h2 className="post-card__title">{post.title}</h2>
      <p className="post-card__meta">
        By {post.author || 'Anonymous'} &middot; {formatDate(post.createdAt)}
      </p>
      <p className="post-card__content">{post.content}</p>
    </article>
  );
}

export default PostItem;
