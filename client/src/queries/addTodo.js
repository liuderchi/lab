import gql from 'graphql-tag';
import TodoFragment from './fragments';

const addTodo = gql`
  mutation myAddTodo($title: String!) {
    addTodo(title: $title) {
      ...TodoFragment
    }
  }
  ${TodoFragment}
`;

export default addTodo;
