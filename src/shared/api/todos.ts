import { todos } from 'shared/constants';
import { api } from 'shared/lib';
import {
  ICreateTodoRequest,
  IGetTodosRequest,
  ITodoResponse,
  IUpdateTodoRequest,
} from 'shared/types';

const getTodos = async (
  params?: IGetTodosRequest,
  signal?: AbortSignal,
): Promise<ITodoResponse[]> => {
  await api.get('/todos', {
    params,
    signal,
  });

  return todos;
};

const updateTodo = async (
  todoId: string,
  payload: Partial<IUpdateTodoRequest>,
): Promise<string> => {
  try {
    await api.put(`/todos/${todoId}`, payload);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  const foundTodoId = todos.findIndex(({ id }) => id.toString() === todoId);

  if (foundTodoId >= 0) {
    todos[foundTodoId] = {
      ...todos[foundTodoId],
      ...payload,
    };
  }

  return 'Todo was updated';
};

const createTodo = async (payload: ICreateTodoRequest): Promise<string> => {
  await api.post('/todos', payload);

  todos.push(payload);

  return 'Todo was created';
};

export const todosApi = {
  getTodos,
  createTodo,
  updateTodo,
};
