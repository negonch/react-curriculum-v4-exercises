//Lesson-03 Component Lifecycle, Hooks, State, and Props
//Exercise: React Bug Hunt – Fix the broken components in this folder
//Impport components here

import BugMutatedState from './BugMutatedState';
import BugEffectLoop from './BugEffectLoop';
import BugProps from './BugProps';

export default function StudentWork() {
  return (
    <div>
      {/* add components here */}
      <BugEffectLoop />
      <BugMutatedState />
      <BugProps />
    </div>
  );
}
