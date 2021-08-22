import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { completeTodo } from '../../api/todos';
import { TodoType } from '../../types/todoType';

export default function useCompleteTodoMutation(): UseMutationResult<
  TodoType[],
  AxiosError,
  TodoType,
  {
    previousTodos: TodoType[] | undefined;
  }
> {
  const queryClient = useQueryClient();
  return useMutation(completeTodo, {
    onMutate: async (updateTodo: TodoType) => {
      await queryClient.cancelQueries('todos');
      const previousTodos = queryClient.getQueryData<TodoType[]>('todos');

      if (previousTodos) {
        previousTodos.forEach((todo) => {
          if (todo.id === updateTodo.id) {
            todo.completed = !todo.completed;
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
