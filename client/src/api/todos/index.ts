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
