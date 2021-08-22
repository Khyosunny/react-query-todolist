# React Query 를 사용한 Todo List

## React Query + TypeScript + Styled-components

![image](https://user-images.githubusercontent.com/85142612/130334475-d3ac2ec4-4ba3-4f2d-8fa1-09bd767f0684.png)

- 서버는 배포할 생각이 없었기 때문에 json-server를 사용했습니다.

---

<br />

회사에 근무하면서, 기존에 작성되어있는 코드들을 보며 느낀점은 **api 요청과 hooks, 데이터를 컨트롤하는 함수가 어떤 파일에선 모두 모여있었고 어떤 파일에선 같은 이름으로 새로 선언되기도 하는 둥 많은 혼란을 주어 파악하기가 굉장히 어려웠던 점**입니다. tsx(또는 jsx) 한 파일에서 데이터 요청, 컨트롤, 스타일이 모두 작성 되어있으면 가독성도 떨어지고 코드가 너무 길어 파악하는데에도 오래걸립니다. 이 프로젝트는 그러한 문제점들을 어떻게 보완하면 좋을까 라는 고민을 시작으로 새로 도입하기로 한 `React Query`를 스스로 공부하며 연습한 Todo list 입니다.
Todo list를 만든 이유는 CRUD 기능이 모두 들어가기 때문에 `useQuery`와 `useMutation`을 폭 넓게 사용할 수 있을 것 같다고 판단했기 때문입니다. #후기 부분에 더 많은 생각들을 적었습니다.

<br />

# Contents:

- [Installation](#Installation)

- [📁 src/api/](#srcapi)

- [📁 src/components/](#srccomponents)

- [📁 src/hooks/](#srchooks)

- [📁 src/types/](#srctypes)

- [후기](#후기)

<br />

# Installation

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

<br />

# src/api/

- feature 단위 별 api 요청 함수를 모아두면 좋을 것 같아 하위에 todos 폴더를 생성하여 함수들을 모아주었습니다.

## api/todo/index.tsx

```tsx
import client from '../client';
import { TodoType } from '../../types/todoType';

export const fetchTodos = async (): Promise<TodoType[]> => {
  const { data } = await client.get<TodoType[]>(`/todos`);
  return data;
};

export const addTodo = async (newTodo: TodoType): Promise<TodoType> => {
  const { data } = await client.post<TodoType>(`/todos`, newTodo);
  return data;
};

export const completeTodo = async (updateTodo: TodoType): Promise<TodoType> => {
  const { data } = await client.put<TodoType>(
    `/todos/${updateTodo.id}`,
    updateTodo
  );
  return data;
};

export const removeTodo = async (id: number): Promise<TodoType> => {
  const { data } = await client.delete<TodoType>(`/todos/${id}`);
  return data;
};

export const updateTodo = async (updateTodo: TodoType): Promise<TodoType> => {
  const { data } = await client.put<TodoType>(
    `/todos/${updateTodo.id}`,
    updateTodo
  );
  return data;
};
```

<br />

# src/components/

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

```tsx
const todoQuery = useTodosQuery();
```

<br />

## hooks/Mutation/useAddTodoMuation.ts

```tsx
import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { addTodo } from '../../api/todos';
import { TodoType } from '../../types/todoType';

export default function useAddTodoMutation(): UseMutationResult<
  TodoType,
  AxiosError,
  TodoType,
  {
    previousTodos: TodoType[] | undefined;
  }
> {
  const queryClient = useQueryClient();
  return useMutation(addTodo, {
    onMutate: async (newTodo: TodoType) => {
      await queryClient.cancelQueries('todos');
      const previousTodos = queryClient.getQueryData<TodoType[]>('todos');

      if (previousTodos) {
        queryClient.setQueryData<TodoType[]>('todos', (old) => [
          ...(old as TodoType[]),
          newTodo,
        ]);
      }
      return { previousTodos };
    },
    onError: (
      err: AxiosError,
      variables: TodoType,
      context?: { previousTodos: TodoType[] | undefined }
    ) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<TodoType[]>('todos', context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('todos');
    },
  });
}
```

- 새로운 todo 를 생성하기 위해 셋팅한 mutation hooks.
- mutation의 `optimistic update` 는 사용자가 어떠한 액션을 발생시켰을 때 요청이 성공했는지 실패했는지 아직 알 수 없는 상태에서 성공할 것이라고 낙관적으로 가정하고 사용자가 보는 UI를 먼저 변화시켜주는 것을 말합니다. mutation은 이렇게 빠른 사용자 경험을 제공할 수 있는 강력한 장점이 있습니다.
- onError 는 요청이 실패했을 경우 onMutate에서 반환한 이전 값(context)으로 롤백시켜줍니다.
- onSettled 는 요청 성공 유무에 상관없이 기존 쿼리를 무효화 시키는 invalidateQueries가 실행됩니다.

<br />

> ## 여기서 잠깐...

## TodoForm Component 1

```tsx
export default function TodoForm({ data }: TodoFormProps) {
  const [todo, setTodo] = useState('');
  const addMutation = useAddTodoMutation();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }, []);

  const handleAddTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTodo('');
      addMutation.mutate({
        id: data[data.length - 1].id + 1,
        todo,
        completed: false,
      });
    },
    [data, addMutation, todo]
  );

  return (
    <Form onSubmit={handleAddTodo}>
      <Input
        type="text"
        value={todo}
        onChange={handleChange}
        placeholder="할 일을 입력해주세요."
      />
      <SubmitButton />
    </Form>
  );
}
```

- TodoForm 컴포넌트에서 useAddTodoMutation 훅을 import 하여 사용했는데 handleChange 함수, handleAddTodo 함수가 tsx 파일에서 선언되어 있어 정리해주고 싶었습니다.

- 이 프로젝트는 크기가 작기 때문에 많은 함수 사용이 필요하지 않지만... 실제 프로젝트에선 이런 함수 선언문들이 연달아 길게 늘어져 있으면 위 아래로 코드를 왔다갔다 하며 보는데에 피로감을 느낄 수 있습니다. (실제로 느꼈음)
  이것을 또 hook에서 반환시켜주면 깔끔해질 수 있겠단 생각에 `useAddTodo` 를 작성하였습니다.

<br />

## hooks/useAddTodo.ts

```tsx
import { useState, useCallback } from 'react';
import { TodoType } from '../types/todoType';
import useAddTodoMutation from './Mutation/useAddTodoMutation';

export default function useAddTodo(data: TodoType[]) {
  const [todo, setTodo] = useState('');
  const addMutation = useAddTodoMutation();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }, []);

  const handleAddTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTodo('');
      addMutation.mutate({
        id: data[data.length - 1].id + 1,
        todo,
        completed: false,
      });
    },
    [data, addMutation, todo]
  );

  return {
    todo,
    handleChange,
    handleAddTodo,
  };
}
```

- handleChange와 handleAddTodo 함수를 useAddTodo 에서 만들어주고 리턴해주었습니다.

## TodoForm Component 2

```tsx
export default function TodoForm({ data }: TodoFormProps) {
  const { todo, handleChange, handleAddTodo } = useAddTodo(data);

  return (
    <Form onSubmit={handleAddTodo}>
      <Input
        type="text"
        value={todo}
        onChange={handleChange}
        placeholder="할 일을 입력해주세요."
      />
      <SubmitButton />
    </Form>
  );
}
```

- useAddTodo hook에서 state 와 함수들을 리턴해주니 코드가 훨씬 보기 편해졌습니다.

<br />

# 후기

## 회사 프로젝트의 문제점

여러가지 문제점이 있었지만 이번에 개선해야겠다 생각이 들었던 문제점을 정리해보았습니다.

1. 하나의 feature 에 대해 어떠어떠한 api 들이 있는지 파악이 되지 않음. (초반에 api 문서가 없단 사실만 알았고 스웨거로 api 리스트를 볼 수 있다는 것은 나중에 알았음)
2. 같은 api 요청 로직이 여러 파일에서 새로 선언되어 있던 문제점.
3. 분명 같은 일을 하는 함수였고 함수 이름도 같았어서 수정을 했는데 다른 컴포넌트에서 반영이 안됨. 알고보니 여기저기 파일에 **같은 이름으로 새로 선언되어 있어** 사실은 다른 함수였던 문제점

## 해결

경험이 많지 않은 1년차 미만 개발자라 계속 좋은 방법을 찾아나서야겠지만 생각났던 해결 방법은

1번 2번, axios로의 api 요청은 feature 단위로 폴더를 만들어서 api 요청 함수들을 모아두면 파악하기 수월할 것이라고 생각했습니다.
3번은 Custom hooks 로 관리하면 되겠다 생각했고 머릿 속에 맴돌던 이런 방법을 이 todo list 프로젝트로 구체화 시켰습니다.

개발자는 하나의 기능에 대해,
api 폴더에서 서버에 요청하는 함수를 확인하고
hooks 폴더에 있는 Query 폴더 또는 Mutation 폴더에서 데이터가 어떻게 캐싱되는지, 어떻게 업데이트 되는지 파악할 수 있고, 필요로 하는 데이터를 컨트롤 하는 hooks 까지 파악할 수 있습니다.

위에서 작성한 새로운 할 일을 추가하는 addTodo 의 흐름은 이렇게 됩니다.

ex)
useAddTodo hooks -> useAddTodo mutation hooks -> api
