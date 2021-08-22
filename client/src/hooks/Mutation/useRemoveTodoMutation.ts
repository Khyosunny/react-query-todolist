import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { removeTodo } from '../../api/todos';
import { TodoType } from '../../types/todoType';

export default function useRemoveTodoMutation(): UseMutationResult<
  TodoType[],
  AxiosError,
  number,
  {
    previousTodos: TodoType[] | undefined;
  }
> {
  const queryClient = useQueryClient();
  return useMutation(removeTodo, {
    onMutate: async (id: number) => {
      await queryClient.cancelQueries('todos');
      const previousTodos = queryClient.getQueryData<TodoType[]>('todos');

      if (previousTodos) {
        const updataTodos = previousTodos.filter((todo) => todo.id !== id);
        queryClient.setQueryData<TodoType[]>('todos', updataTodos);
      }

      return { previousTodos };
    },
    onError: (
      err: AxiosError,
      variables: number,
      context?: { previousTodos: TodoType[] | undefined }
    ) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<TodoType[]>('todos', context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('todos');
    },
  });
}
