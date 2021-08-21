import styled from 'styled-components';
import { TodoType } from '../../types/todoType';
import useAddTodo from '../../hooks/useAddTodo';
import SubmitButton from '../SubmitButton';

interface SubmitTodoProps {
  data: TodoType[];
}

export default function SubmitTodo({ data }: SubmitTodoProps) {
  const { todo, handleChange, handleAddTodo } = useAddTodo(data);

  return (
    <Form onSubmit={handleAddTodo}>
      <Input
        type="text"
        value={todo}
        onChange={handleChange}
        placeholder="할 일을 입력해주세요."
      />
      <SubmitButton />
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
