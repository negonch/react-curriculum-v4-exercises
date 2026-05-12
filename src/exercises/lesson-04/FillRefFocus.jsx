// TOPIC: Correct useRef usage to control DOM elements
// TASK: Implement focusing an input field when the button is clicked.
import { useRef } from 'react';

export default function FillRefFocus() {
  const focusInput = useRef();

  function handleClick(event) {
    focusInput.current.focus();
  }

  return (
    <div>
      <h2>useRef: Focusing an Input</h2>

      <input ref={focusInput} type="text" placeholder="Type here..." />

      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
