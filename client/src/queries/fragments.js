import gql from 'graphql-tag';

export const TodoFragment = gql`
  fragment TodoFragment on Todo {
    id
    done
    title
  }
`;

export default TodoFragment;
