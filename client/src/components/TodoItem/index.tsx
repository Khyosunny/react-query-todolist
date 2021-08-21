import { useCallback } from 'react';
import styled from 'styled-components';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { TodoType } from '../../lib/api/todos';
import useCompleteTodo from '../../hooks/todos/useCompleteTodo';

interface TodoItemProps {
  todo: TodoType;
  handleComplete?: (id: number) => void;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const completeMutation = useCompleteTodo();

  const handleComplete = useCallback(
    (todo: TodoType) => {
      completeMutation.mutate(todo);
    },
    [completeMutation]
  );

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
  width: '100%';
  font-size: 20px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  color: ${(p) => (p.completed ? '#b9b9b9' : 'black')};
  text-decoration: ${(p) => (p.completed ? 'line-through' : 'none')};

  svg {
    margin-right: 10px;
  }
`;
