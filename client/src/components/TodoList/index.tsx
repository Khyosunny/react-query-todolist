import useTodosQuery from '../../hooks/todos/useTodosQuery';
import TodoItem from '../TodoItem';

export default function TodoList() {
  const { isLoading, isError, error, data } = useTodosQuery();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error: {error}</h3>;

  return (
    <ul>
      {data?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
