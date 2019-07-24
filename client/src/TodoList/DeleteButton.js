import React from 'react';
import { graphql } from 'react-apollo';
import { deleteTodo as DELETE_TODO } from '../queries';
import { onDeleteUpdateCacheFactory } from '../utils';

/**
 * hoc to provide mutate function `deleteTodo` and apollo props (e.g. data, loading, error)
 *   https://www.apollographql.com/docs/react/api/react-apollo/#graphqlquery-configcomponent
 */
export const withDeleteTodo = graphql(DELETE_TODO, {
  options: {
    ignoreResults: false, // set true would ignore `data`, `loading` in render prop
  },
  // props mapper, like mapStateToProps
  props: ({ mutate, ...otherProps }) => ({
    deleteTodo: (todo) /* :object */ =>
      mutate({
        variables: { id: todo.id },
        update: onDeleteUpdateCacheFactory({ todo }),
      }),
    ...otherProps,
  }),
});

const DeleteButton = ({ todo, deleteTodo, ...otherProps }) => {
  return (
    <button
      onClick={() => {
        if (todo) deleteTodo(todo);
      }}
      {...otherProps}
    >
      X
    </button>
  );
};

export default withDeleteTodo(DeleteButton);
