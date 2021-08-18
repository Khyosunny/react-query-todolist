import styled from 'styled-components';
import { TodoType } from '../../lib/api/todos';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

interface TodoItemProps {
  todo: TodoType;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <Item>
      <CheckBoxOutlineBlankIcon />
      {todo.todo}
    </Item>
  );
}

const Item = styled.li`
  font-size: 20px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;
