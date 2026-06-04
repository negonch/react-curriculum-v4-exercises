import './Lesson07Styles.css';
import { getSinglePost } from './api';
import { useState } from 'react';

export default function FetchOnClick() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGetPost() {
    try {
      setLoading(true);
      setError('');

      const data = await getSinglePost(1);
      setPost(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>
      <button type="button" onClick={handleGetPost}>
        Get post
      </button>
      <div className="content">
        {loading && <p>Loading post...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && post && (
          <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </article>
        )}
      </div>
    </div>
  );
}
