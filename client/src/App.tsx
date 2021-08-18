import styled from 'styled-components';
import useTodosQuery from './hooks/todos/useTodosQuery';
import useAddTodo from './hooks/todos/useAddTodo';
import TodoList from './components/TodoList';

export default function App() {
  // const addMutation = useAddTodo();
  // addMutation.mutate(newTodo);

  return (
    <Root>
      <Container>
        <h1>To Do List</h1>
        <TodoList />
      </Container>
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

const Container = styled.div`
  min-width: 500px;
  padding: 30px;
  box-shadow: rgba(130, 130, 139, 0.137) 0px 7px 15px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
