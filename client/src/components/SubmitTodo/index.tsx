import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import useAddTodo from '../../hooks/todos/useAddTodo';
import { TodoType } from '../../types/todoType';
import Button from '../Button';

interface SubmitTodoProps {
  data: TodoType[];
}

export default function SubmitTodo({ data }: SubmitTodoProps) {
  const [todo, setTodo] = useState('');
  const addMutation = useAddTodo();

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }, []);

  return (
    <Form onSubmit={handleAddTodo}>
      <Input type="text" value={todo} onChange={handleChange} />
      <Button />
    </Form>
  );
}

const Input = styled.input`
  width: 80%;
  height: 50px;
  padding: 10px;
  font-size: 20px;
  border: 2px solid #000;
`;

const Form = styled.form`
  margin-top: 100px;
  display: flex;
  align-items: center;
  width: 100%;
`;
