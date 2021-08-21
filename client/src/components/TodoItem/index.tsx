import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { TodoType } from '../../types/todoType';
import useCompleteTodo from '../../hooks/useCompleteTodo';
import useRemoveTodo from '../../hooks/useRemoveTodo';
import useUpdateTodo from '../../hooks/useUpdateTodo';
import CheckButton from '../CheckButton';
import UpdateTodoForm from '../UpdateTodoForm';

interface TodoItemProps {
  data: TodoType;
}

export default function TodoItem({ data }: TodoItemProps) {
  const { handleComplete } = useCompleteTodo();
  const { handleRemove } = useRemoveTodo();
  const {
    openInput,
    handleOpenInput,
    updateTodo,
    handleUpdateChange,
    handleUpdate,
  } = useUpdateTodo(data);

  return (
    <Item
      completed={data.completed}
      openInput={openInput}
      onClick={handleOpenInput}
    >
      <CheckButton data={data} handleComplete={handleComplete} />
      {openInput ? (
        <UpdateTodoForm
          updateTodo={updateTodo}
          handleUpdate={handleUpdate}
          handleUpdateChange={handleUpdateChange}
        />
      ) : (
        <>
          {data.todo}
          <RemoveButton onClick={(e) => handleRemove(e, data.id)}>
            <ClearIcon />
          </RemoveButton>
        </>
      )}
    </Item>
  );
}

interface styleProps {
  completed?: boolean;
  openInput?: boolean;
}

const RemoveButton = styled.button`
  position: absolute;
  right: 0;
  display: none;
  svg {
    fill: red;
  }
`;

const Item = styled.li<styleProps>`
  position: relative;
  width: 100%;
  height: 60px;
  padding: 10px 0 10px 10px;
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(p) => (p.completed ? '#c7c0b3' : 'black')};
  text-decoration: ${(p) =>
    p.completed ? (p.openInput ? 'none' : 'line-through') : 'none'};
  border-bottom: 2px solid #000000;

  &:hover ${RemoveButton} {
    display: block;
  }

  svg {
    margin-right: 10px;
  }
`;
