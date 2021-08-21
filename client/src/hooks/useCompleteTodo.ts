import { useCallback } from 'react';
import { TodoType } from '../types/todoType';
import useCompleteTodoMutation from './Mutation/useCompleteTodoMutation';

export default function useCompleteTodo() {
  const completeMutation = useCompleteTodoMutation();

  const handleComplete = useCallback(
    (e: React.SyntheticEvent, data: TodoType) => {
      e.stopPropagation();
      completeMutation.mutate(data);
    },
    [completeMutation]
  );

  return { handleComplete };
}
