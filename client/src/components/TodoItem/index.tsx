import styled from 'styled-components';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { TodoType } from '../../types/todoType';
import useCompleteTodo from '../../hooks/useCompleteTodo';

interface TodoItemProps {
  todo: TodoType;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { handleComplete } = useCompleteTodo();

  return (
    <Item completed={todo.completed} onClick={() => handleComplete(todo)}>
      {todo.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      {todo.todo}
    </Item>
  );
}

interface styleProps {
  completed?: boolean;
}

const Item = styled.li<styleProps>`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(p) => (p.completed ? '#b9b9b9' : 'black')};
  text-decoration: ${(p) => (p.completed ? 'line-through' : 'none')};
  border-bottom: 2px solid #000000;

  svg {
    margin-right: 10px;
  }
`;
