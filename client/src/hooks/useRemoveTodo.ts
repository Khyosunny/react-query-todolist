import { useCallback } from 'react';
import useRemoveTodoMutation from './Mutation/useRemoveTodoMutation';

export default function useRemoveTodo() {
  const removeMutation = useRemoveTodoMutation();

  const handleRemove = useCallback(
    (id: number) => {
      removeMutation.mutate(id);
    },
    [removeMutation]
  );

  return {
    handleRemove,
  };
}
