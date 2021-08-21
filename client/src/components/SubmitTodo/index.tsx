import styled from 'styled-components';
import useAddTodo from '../../hooks/useAddTodo';
import { TodoType } from '../../types/todoType';
import Button from '../Button';

interface SubmitTodoProps {
  data: TodoType[];
}

export default function SubmitTodo({ data }: SubmitTodoProps) {
  const { todo, handleChange, handleAddTodo } = useAddTodo(data);

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
