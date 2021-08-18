import { TodoType } from '../../lib/api/todos';

interface TodoItemProps {
  todo: TodoType;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return <li>{todo.todo}</li>;
}
