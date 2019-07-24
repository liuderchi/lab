import gql from 'graphql-tag';
import TodoFragment from './fragments';

export const updateTodo = gql`
  mutation myUpdateTodo($id: Int!, $done: Boolean, $title: String) {
    updateTodo(id: $id, done: $done, title: $title) {
      ...TodoFragment
    }
  }
  ${TodoFragment}
`;

export default updateTodo;
