import React from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>My Blog</h1>
      </header>

      <main className="app__main">
        <section className="app__form-section">
          <PostForm />
        </section>

        <section className="app__list-section">
          <h2 className="app__list-title">Latest Posts</h2>
          <PostList />
        </section>
      </main>
    </div>
  );
}

export default App;
