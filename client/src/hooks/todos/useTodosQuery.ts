import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetchTodos } from '../../lib/api/todos';
import { TodoType } from '../../types/todoType';

export default function useTodosQuery<TData = TodoType[]>(
  options?: UseQueryOptions<TodoType[], AxiosError, TData>
) {
  return useQuery('todos', fetchTodos, options);
}
