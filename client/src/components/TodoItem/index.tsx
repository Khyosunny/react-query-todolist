import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { TodoType } from '../../types/todoType';
import useCompleteTodo from '../../hooks/useCompleteTodo';
import useRemoveTodo from '../../hooks/useRemoveTodo';
import CheckButton from '../CheckButton';

interface TodoItemProps {
  todo: TodoType;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { handleComplete } = useCompleteTodo();
  const { handleRemove } = useRemoveTodo();

  return (
    <Item completed={todo.completed}>
      <CheckButton
        completed={todo.completed}
        handleComplete={() => handleComplete(todo)}
      />
      {todo.todo}
      <RemoveButton onClick={() => handleRemove(todo.id)}>
        <ClearIcon />
      </RemoveButton>
    </Item>
  );
}

interface styleProps {
  completed?: boolean;
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
  padding: 10px;
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(p) => (p.completed ? '#c7bca7' : 'black')};
  text-decoration: ${(p) => (p.completed ? 'line-through' : 'none')};
  border-bottom: 2px solid #000000;

  &:hover ${RemoveButton} {
    display: block;
  }

  svg {
    margin-right: 10px;
  }
`;
