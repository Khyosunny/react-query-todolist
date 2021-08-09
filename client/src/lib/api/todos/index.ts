import client from '../client';

export interface Todos {
  id: number;
  todo: string;
  completed: boolean;
  createAt: string;
}

export const fetchTodoList = async () => {
  const { data } = await client.get<Todos[]>(`/todos`);
  return data;
};
