import React from 'react';
import { graphql, Query } from 'react-apollo';
import TodoListItem from './TodoListItem';
import { getTodos as GET_TODOS } from '../queries';

// TODO use hook of react-apollo

const TodoList = ({ data, error, loading, refetch }) => {
  if (error) return <p>{`❌ Error :(`}</p>;
  if (loading) return <p>{`🔄 Loading...`}</p>;
  return (
    <React.Fragment>
      <ul>
        {data.todos.map(todo => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <button onClick={() => refetch()}>{`🔄 Refresh`}</button>
    </React.Fragment>
  );
};

/**
 * hoc to provide gql data and apollo props (e.g. data, loading, error)
 *   https://www.apollographql.com/docs/react/api/react-apollo/#graphqlquery-configcomponent
 */
export const withGetTodos = graphql(GET_TODOS, {
  options: {
    ignoreResults: false, // set true would ignore `data`, `loading` in render prop
    fetchPolicy: 'cache-and-network',
  },
  // https://www.apollographql.com/docs/react/api/react-apollo/#propsdata
  props: ({ data: { todos, error, loading, refetch } }) => ({
    data: { todos },
    error,
    loading,
    refetch,
  }),
});

/**
 * Alternative: TodoList Component using render prop API of `Query`
 *   e.g. export default TodoListWithRenderProp
 */
export const TodoListWithRenderProp = () => (
  <Query
    query={GET_TODOS} // pass query and provide a func to children
    // pollInterval={3000} // polling Interval; 0 means disable
    fetchPolicy="cache-and-network" // default: 'cache-only' would failed to update when refetch
  >
    {({ loading, error, data, refetch }) => {
      return (
        <TodoList
          data={data}
          error={error}
          loading={loading}
          refetch={refetch}
        />
      );
    }}
  </Query>
);

export default withGetTodos(TodoList);
