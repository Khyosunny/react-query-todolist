import { useState, useCallback } from 'react';
import { TodoType } from '../types/todoType';
import useAddTodoMutation from './Mutation/useAddTodoMutation';

export default function useAddTodo(data: TodoType[]) {
  const [todo, setTodo] = useState('');
  const addMutation = useAddTodoMutation();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }, []);

  const handleAddTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTodo('');
      addMutation.mutate({
        id: data[data.length - 1].id + 1,
        todo,
        completed: false,
      });
    },
    [data, addMutation, todo]
  );

  return {
    todo,
    handleChange,
    handleAddTodo,
  };
}
