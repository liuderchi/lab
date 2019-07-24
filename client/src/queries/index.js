import getTodos from './getTodos';
import addTodo from './addTodo';
import deleteTodo from './deleteTodo';
import updateTodo from './updateTodo';
import subscribeOnTodoChanged from './subscribeOnTodoChanged';

export default {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  subscribeOnTodoChanged,
};

export { default as getTodos } from './getTodos';
export { default as addTodo } from './addTodo';
export { default as deleteTodo } from './deleteTodo';
export { default as updateTodo } from './updateTodo';
export { default as subscribeOnTodoChanged } from './subscribeOnTodoChanged';
