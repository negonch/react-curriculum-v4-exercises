import BugStrictMode from './BugStrictMode';
import FindCorrectHook from './FindCorrectHook';
import BugEventPropagation from './BugEventPropagation';
import FillRefFocus from './FillRefFocus';
import BugChildParentCommunication from './BugChildParentCommuncation/BugChildParentCommunication';
import { StrictMode } from 'react';

export default function StudentWork() {
  return (
    <StrictMode>
      <BugStrictMode />
      <hr />
      <FindCorrectHook />
      <hr />
      <BugEventPropagation />
      <hr />
      <FillRefFocus />
      <hr />
      <BugChildParentCommunication />
    </StrictMode>
  );
}
