import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { addTodo, TodoType } from '../../lib/api/todos';

export default function useAddTodo(): UseMutationResult<
  TodoType[],
  unknown,
  TodoType,
  {
    previousTodos: TodoType[] | undefined;
  }
> {
  const queryClient = useQueryClient();
  return useMutation(addTodo, {
    onMutate: async (newTodo: TodoType) => {
      await queryClient.cancelQueries('todos');
      const previousTodos = queryClient.getQueryData<TodoType[]>('todos');

      if (previousTodos) {
        queryClient.setQueryData<TodoType[]>('todos', [
          ...previousTodos,
          newTodo,
        ]);
      }

      return { previousTodos };
    },
    onError: (
      err: AxiosError,
      variables: TodoType,
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
