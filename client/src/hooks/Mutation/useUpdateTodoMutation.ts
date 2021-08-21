import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { updateTodo } from '../../lib/api/todos';
import { TodoType } from '../../types/todoType';

export default function useUpdateTodoMutation(): UseMutationResult<
  TodoType[],
  AxiosError,
  TodoType,
  {
    previousTodos: TodoType[] | undefined;
  }
> {
  const queryClient = useQueryClient();
  return useMutation(updateTodo, {
    onMutate: async (updateTodo: TodoType) => {
      await queryClient.cancelQueries('todos');
      const previousTodos = queryClient.getQueryData<TodoType[]>('todos');

      if (previousTodos) {
        previousTodos.forEach((todo) => {
          if (todo.id === updateTodo.id) {
            todo.todo = updateTodo.todo;
          }
        });
        queryClient.setQueryData<TodoType[]>('todos', previousTodos);
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
