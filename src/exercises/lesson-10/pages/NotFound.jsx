import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();

  return (
    <section>
      <h2>404: Not Found</h2>

      <p>
        No page found for path: <code>{location.pathname}</code>
      </p>

      <Link to="/lessons/lesson-10">Go Home</Link>
    </section>
  );
}
