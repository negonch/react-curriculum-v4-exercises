import './Lesson07Styles.css';
import { getPosts } from './api.js';
import { useState, useEffect } from 'react';

export default function FetchOnRender() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isRan = false;
    (async () => {
      console.log('useEffect running');
      try {
        setLoading(true);
        setError('');

        const data = await getPosts();

        if (isRan) {
          console.log('skipped setPosts()');
        } else {
          console.log('ran setPosts()');
          setPosts(data);
        }
      } catch (error) {
        if (!isRan) {
          setError(error.message);
        }
      } finally {
        if (!isRan) {
          setLoading(false);
        }
      }
    })();
    return () => {
      console.log('cleanup performed');
      isRan = true;
    };
  }, []);

  return (
    <div className="root">
      <h1 className="heading">Fetch list of posts on render</h1>
      <div className="content">
        {loading && <p>Loading information</p>}
        {error && <p>{error}</p>}
        {!loading &&
          !error &&
          posts.map((post) => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </article>
          ))}
      </div>
    </div>
  );
}
