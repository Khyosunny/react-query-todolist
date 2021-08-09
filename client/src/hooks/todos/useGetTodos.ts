import { useQuery } from 'react-query';
import { fetchTodoList } from 'src/lib/api/todos';

export default function useGetTodos() {
  const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList);
  return { isLoading, isError, data, error };
}
