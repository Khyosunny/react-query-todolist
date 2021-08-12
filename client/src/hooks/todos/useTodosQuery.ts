import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetchTodos, TodoType } from '../../lib/api/todos';

export default function useTodosQuery<TData = TodoType[]>(
  options?: UseQueryOptions<TodoType[], AxiosError, TData>
) {
  return useQuery('todos', fetchTodos, options);
}
