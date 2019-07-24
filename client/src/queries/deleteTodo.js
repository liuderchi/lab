import gql from 'graphql-tag';
import TodoFragment from './fragments';

export const deleteTodo = gql`
  mutation myDeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      ...TodoFragment
    }
  }
  ${TodoFragment}
`;

export default deleteTodo;
