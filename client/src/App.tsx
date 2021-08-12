import useTodosQuery from './hooks/todos/useTodosQuery';
import useAddTodo from './hooks/todos/useAddTodo';

export default function App() {
  const { isLoading, isError, error, data } = useTodosQuery();

  const addMutation = useAddTodo();
  // addMutation.mutate(newTodo);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error: {error}</h3>;
  return (
    <div>
      <h1>리액트 쿼리를 사용한 투두리스트</h1>
      <ul>
        {data?.map((todo) => (
          <li>{todo.todo}</li>
        ))}
      </ul>
    </div>
  );
}
