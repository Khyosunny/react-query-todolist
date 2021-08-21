import { AxiosError } from 'axios';
import styled from 'styled-components';
import { UseQueryResult } from 'react-query';
import { TodoType } from '../../types/todoType';
import TodoItem from '../TodoItem';

interface TodoListProps {
  todoQuery: UseQueryResult<TodoType[], AxiosError>;
}

export default function TodoList({ todoQuery }: TodoListProps) {
  const { isLoading, isError, error, data } = todoQuery;

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error: {error}</h3>;
  return (
    <TodoItemContainer>
      {data?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </TodoItemContainer>
  );
}

const TodoItemContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
