import { getTodos as GET_TODOS } from './queries';

export const onToggleUpdateCacheFactory = ({ todo, done }) => cache => {
  const { todos } = cache.readQuery({ query: GET_TODOS });
  todos.forEach(item => {
    if (item.id === todo.id) item.done = done;
  });
  cache.writeQuery({ query: GET_TODOS, data: todos });
};

export const onDeleteUpdateCacheFactory = ({ todo }) => cache => {
  const { todos: prevTodos } = cache.readQuery({
    query: GET_TODOS,
  });
  cache.writeQuery({
    query: GET_TODOS,
    data: {
      todos: prevTodos.filter(item => item.id !== todo.id),
    },
  });
};
