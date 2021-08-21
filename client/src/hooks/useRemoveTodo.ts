import React, { useCallback } from 'react';
import useRemoveTodoMutation from './Mutation/useRemoveTodoMutation';

export default function useRemoveTodo() {
  const removeMutation = useRemoveTodoMutation();

  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
      e.stopPropagation();
      removeMutation.mutate(id);
    },
    [removeMutation]
  );

  return {
    handleRemove,
  };
}
