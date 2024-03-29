import styled from 'styled-components';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import useTodosQuery from './hooks/Query/useTodosQuery';

export default function App() {
  const todoQuery = useTodosQuery();

  return (
    <Root>
      <TodoListContainer>
        <Title>✏️To Do List</Title>
        <TodoList todoQuery={todoQuery} />
        <TodoForm data={todoQuery.data ?? []} />
      </TodoListContainer>
    </Root>
  );
}

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f1ed;
`;

const TodoListContainer = styled.div`
  min-width: 450px;
  padding: 30px 40px;
  box-shadow: rgba(187, 168, 146, 0.137) 0px 5px 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;
