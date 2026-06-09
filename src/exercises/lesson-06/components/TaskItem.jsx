export function TaskItem({ task }) {
  return (
    <li>
      {task.title} {task.completed ? '✅' : '⏳'}
    </li>
  );
}
