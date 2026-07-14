import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import Modal from './components/Modal';
import { GET_POSTS } from './graphql/queries';
import './styles/App.css';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_POSTS);
  const posts = data?.posts ?? [];

  return (
    <div className="app">
      <header className="app__header">
        <h1>My Blog</h1>
      </header>

      <main className="app__main">
        <section className="app__list-section">
          <div className="app__list-header">
            <h2 className="app__list-title">
              Latest Posts {!loading && !error && <span className="app__post-count">({posts.length})</span>}
            </h2>
            <button type="button" className="app__new-post-btn" onClick={() => setIsFormOpen(true)}>
              New Post
            </button>
          </div>
          <PostList posts={posts} loading={loading} error={error} />
        </section>
      </main>

      {isFormOpen && (
        <Modal title="Add a New Post" onClose={() => setIsFormOpen(false)}>
          <PostForm onSuccess={() => setIsFormOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
