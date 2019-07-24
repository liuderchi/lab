import gql from 'graphql-tag';
import TodoFragment from './fragments';

const onTodoChanged = gql`
  subscription onTodoChanged {
    todoChanged {
      name
      payload {
        ...TodoFragment
      }
    }
  }
  ${TodoFragment}
`;

export default onTodoChanged;
