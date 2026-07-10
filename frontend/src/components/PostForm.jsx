import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST, GET_POSTS } from '../graphql/queries';

const initialState = { title: '', content: '', author: '' };

function PostForm() {
  const [form, setForm] = useState(initialState);
  const [formError, setFormError] = useState('');

  const [addPost, { loading }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setForm(initialState);
      setFormError('');
    },
    onError: (err) => {
      setFormError(err.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      setFormError('Title and content are required.');
      return;
    }

    addPost({
      variables: {
        input: {
          title: form.title.trim(),
          content: form.content.trim(),
          author: form.author.trim() || undefined,
        },
      },
    });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2 className="post-form__title">Add a New Post</h2>

      {formError && <p className="status-message status-message--error">{formError}</p>}

      <div className="post-form__field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter post title"
          disabled={loading}
        />
      </div>

      <div className="post-form__field">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          placeholder="Your name"
          disabled={loading}
        />
      </div>

      <div className="post-form__field">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={6}
          value={form.content}
          onChange={handleChange}
          placeholder="Write your post..."
          disabled={loading}
        />
      </div>

      <button type="submit" className="post-form__submit" disabled={loading}>
        {loading ? 'Publishing...' : 'Publish Post'}
      </button>
    </form>
  );
}

export default PostForm;
