import { useCallback } from 'react';
import { TodoType } from '../types/todoType';
import useCompleteTodoMutation from './Mutation/useCompleteTodoMutation';

export default function useCompleteTodo() {
  const completeMutation = useCompleteTodoMutation();

  const handleComplete = useCallback(
    (todo: TodoType) => {
      completeMutation.mutate(todo);
    },
    [completeMutation]
  );

  return { handleComplete };
}
