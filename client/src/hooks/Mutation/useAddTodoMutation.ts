import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { addTodo } from '../../lib/api/todos';
import { TodoType } from '../../types/todoType';

export default function useAddTodoMutation(): UseMutationResult<
  TodoType[],
  AxiosError<any>,
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
        queryClient.setQueryData<TodoType[]>('todos', (old) => [
          ...(old as TodoType[]),
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
