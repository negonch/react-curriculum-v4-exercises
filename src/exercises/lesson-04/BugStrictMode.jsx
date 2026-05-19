// TOPIC: StrictMode Effects and Cleanup
// TASK: Notice how the count increments incorrectly based on the `setInterval` logic. Fix the useEffect so that the counter increments correctly.

import { useEffect, useState } from 'react';

export default function BugStrictMode() {
  console.log('Component rendered');
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect started');
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      console.log('useEffect cleanup');
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h2>StrictMode Timer Bug</h2>
      <p>Count: {count}</p>
    </div>
  );
}

// StrictMode helps catch this bug because in development it intentionally
// runs the effect twice: it mounts the component, runs the effect, runs the cleanup,
// and then runs the effect again. If the interval is not cleaned up properly,
// two intervals can keep running at the same time, and the counter will work not us expected.
