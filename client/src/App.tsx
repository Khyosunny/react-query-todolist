import styled from 'styled-components';
import TodoList from './components/TodoList';
import SubmitTodo from './components/SubmitTodo';
import useTodosQuery from './hooks/Query/useTodosQuery';

export default function App() {
  const todoQuery = useTodosQuery();

  return (
    <Root>
      <TodoListContainer>
        <h1>To Do List</h1>
        <TodoList todoQuery={todoQuery} />
        <SubmitTodo data={todoQuery.data ?? []} />
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
`;

const TodoListContainer = styled.div`
  min-width: 450px;
  padding: 30px 40px;
  box-shadow: rgba(130, 130, 139, 0.137) 0px 7px 15px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
