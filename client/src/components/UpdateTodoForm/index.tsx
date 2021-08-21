import styled from 'styled-components';
import DoneButton from '../DoneButton';

interface UpdateTodoFormProps {
  updateTodo: string;
  handleUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  handleUpdateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UpdateTodoForm({
  updateTodo,
  handleUpdate,
  handleUpdateChange,
}: UpdateTodoFormProps) {
  return (
    <UpdateForm onSubmit={handleUpdate}>
      <UpdateInput
        type="text"
        value={updateTodo}
        onChange={handleUpdateChange}
      />
      <DoneButton />
    </UpdateForm>
  );
}

const UpdateForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UpdateInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 2px solid #d6d6d6;
  font-size: 20px;
`;
