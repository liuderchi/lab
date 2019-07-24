import gql from 'graphql-tag';
import TodoFragment from './fragments';

const getTodos = gql`
  query myQuery {
    todos {
      ...TodoFragment
    }
    version
  }
  ${TodoFragment}
`;
// https://github.com/apollographql/graphql-tag/issues/169#issuecomment-416514777

export default getTodos;
