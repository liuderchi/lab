import React from 'react';
import { graphql, Query } from 'react-apollo';
import TodoListItem from './TodoListItem';
import { getTodos as GET_TODOS } from '../queries';

// TODO use hook of react-apollo

/**
 * hoc to provide gql data and apollo props (e.g. data, loading, error)
 *   https://www.apollographql.com/docs/react/api/react-apollo/#graphqlquery-configcomponent
 */
export const withGetTodos = graphql(GET_TODOS, {
  options: {
    ignoreResults: false, // set true would ignore `data`, `loading` in render prop
    fetchPolicy: 'cache-and-network',
  },
});

const TodoList_ = ({ data: { todos, error, loading, refetch } }) => {
  if (error) return <p>{`❌ Error :(`}</p>;
  if (loading) return <p>{`🔄 Loading...`}</p>;
  return (
    <React.Fragment>
      <ul>
        {todos.map(todo => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <button onClick={() => refetch()}>{`🔄 Refresh`}</button>
    </React.Fragment>
  );
};

export const TodoList = () => (
  <Query
    query={GET_TODOS} // pass query and provide a func to children
    // pollInterval={3000} // polling Interval; 0 means disable
    fetchPolicy="cache-and-network" // default: 'cache-only' would failed to update when refetch
  >
    {({ loading, error, data, refetch }) => {
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
    }}
  </Query>
);

// export default TodoList;
export default withGetTodos(TodoList_);
