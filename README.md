# React Query 를 사용한 Todo List

## React Query + TypeScript + Styled-components

![image](https://user-images.githubusercontent.com/85142612/130334475-d3ac2ec4-4ba3-4f2d-8fa1-09bd767f0684.png)

- 서버는 배포할 생각이 없었기 때문에 json-server를 사용했습니다.

---

<br />

회사에 근무하면서, 기존에 작성되어있는 코드들을 보며 느낀점은 **api 요청과 hooks, 데이터를 컨트롤하는 함수가 모두 여기저기 흩어져있어 코드 파악을 하기가 굉장히 힘들었다는 점**입니다. tsx(또는 jsx) 한 파일에서 데이터 요청, 컨트롤, 스타일이 모두 작성 되어있으면 가독성도 떨어지고 코드가 너무 길어 파악하는데에 오래걸립니다. 이 프로젝트는 그러한 문제점들을 어떻게 보완하면 좋을까 라는 고민을 시작으로 새로 도입하기로 한 `React Query`를 스스로 공부하며 연습한 Todo list 입니다.
Todo list를 만든 이유는 CRUD 기능이 모두 들어가기 때문에 `useQuery`와 `useMutation`을 폭 넓게 사용할 수 있을 것 같다고 판단했기 때문입니다.

<br />

## /client

```tsx
npm install
npm run start
```

## /server

```tsx
npm install
npm run start
```

<br />

---

<br />

- [📁 src/api/](#src/api/)

- [📁 src/components/](#src/components/)

- [📁 src/hooks/](#src/hooks/)

- [📁 src/types/](#src/types/)

<br />

# 📁 src/api/

- feature 단위 별 api 요청 함수를 모아두면 좋을 것 같아 하위에 todos 폴더를 생성하여 함수들을 모아주었습니다.

## api/todo/index.tsx

```tsx
import client from '../client';
import { TodoType } from '../../types/todoType';

export const fetchTodos = async (): Promise<TodoType[]> => {
  const { data } = await client.get<TodoType[]>(`/todos`);
  return data;
};

export const addTodo = async (newTodo: TodoType): Promise<TodoType[]> => {
  const { data } = await client.post<TodoType[]>(`/todos`, newTodo);
  return data;
};

export const completeTodo = async (
  updateTodo: TodoType
): Promise<TodoType[]> => {
  const { data } = await client.put<TodoType[]>(
    `/todos/${updateTodo.id}`,
    updateTodo
  );
  return data;
};

export const removeTodo = async (id: number) => {
  const { data } = await client.delete<TodoType[]>(`/todos/${id}`);
  return data;
};

export const updateTodo = async (newTodo: TodoType) => {
  const { data } = await client.put<TodoType[]>(
    `/todos/${newTodo.id}`,
    newTodo
  );
  return data;
};
```

<br />

# 📁 src/components/

- 작은 단위의 button 부터 form ..> item ..> list 컴포넌트를 쌓아올렸고 그것들을 모아둔 폴더입니다.

<br />

# src/hooks/

- `React Query`의 `useQuery` 와 `useMutation` 을 셋팅한 Custom hooks 를 각각 **Query 폴더, Mutation 폴더로 분리**했습니다.

## hooks/Query/useTodosQuery.ts

```tsx
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { fetchTodos } from '../../api/todos';
import { TodoType } from '../../types/todoType';

export default function useTodosQuery<TData = TodoType[]>(
  options?: UseQueryOptions<TodoType[], AxiosError, TData>
) {
  return useQuery('todos', fetchTodos, options);
}
```

- api/todos 에서 작성한 todo list를 가져오는 fetchTodos 함수로 쿼리를 요청하고 'todos'라는 문자열로 캐싱을 관리합니다.
