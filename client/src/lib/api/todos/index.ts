import client from '../client';

export interface TodoType {
  id: number;
  todo: string;
  completed: boolean;
  createAt: string;
}

export const fetchTodos = async (): Promise<TodoType[]> => {
  const { data } = await client.get<TodoType[]>(`/todos`);
  return data;
};

export const addTodo = async (newTodo: TodoType): Promise<TodoType[]> => {
  const { data } = await client.post<TodoType[]>(`/todos`, newTodo);
  return data;
};