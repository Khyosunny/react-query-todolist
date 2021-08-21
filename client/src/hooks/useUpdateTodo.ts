import { useState, useCallback } from 'react';
import { TodoType } from '../types/todoType';
import useUpdateTodoMutation from './Mutation/useUpdateTodoMutation';

export default function useUpdateTodo(data: TodoType) {
  const [openInput, setOpenInput] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(data.todo);

  const updateMutation = useUpdateTodoMutation();

  const handleOpenInput = useCallback(() => {
    setOpenInput(true);
  }, []);

  const handleUpdateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUpdateTodo(e.target.value);
    },
    []
  );

  const handleUpdate = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setOpenInput(false);
      updateMutation.mutate({
        ...data,
        todo: updateTodo,
      });
    },
    [data, updateMutation, updateTodo]
  );
  return {
    openInput,
    handleOpenInput,
    updateTodo,
    handleUpdateChange,
    handleUpdate,
  };
}
