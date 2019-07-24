import React, { useState } from 'react';
import { graphql, Mutation } from 'react-apollo';
import DeleteButton from './DeleteButton';
import { updateTodo as UPDATE_TODO } from '../queries';

/**
 * hoc to provide mutate function `updateTodo` and apollo props (e.g. data, loading, error)
 *   https://www.apollographql.com/docs/react/api/react-apollo/#graphqlquery-configcomponent
 */
export const withUpdateTodo = graphql(UPDATE_TODO, {
  options: {
    ignoreResults: false, // set true would ignore `data`, `loading` in render prop
    onCompleted: () => console.log('TODO Success popup'),
  },
  // props mapper, like mapStateToProps
  props: ({ mutate, ...otherProps }) => ({
    updateTodo: (todo) /* :object */ => mutate({ variables: todo }),
    ...otherProps,
  }),
});

const TodoListItem = ({ todo, updateTodo }) => {
  const [title, setTitle] = useState(todo.title);
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          const done = e.target.checked;
          updateTodo({ id: todo.id, done });
        }}
      />
      <input
        value={title}
        onChange={e => {
          const nextTitle = e.target.value;
          setTitle(nextTitle);
          updateTodo({ id: todo.id, title: nextTitle });
        }}
      />
      <DeleteButton todo={todo} />
    </li>
  );
};

export const TodoListItemWithRenderProp = ({ todo }) => {
  const [title, setTitle] = useState(todo.title);
  return (
    <li>
      <Mutation
        mutation={UPDATE_TODO}
        onCompleted={() => console.log('TODO Success popup')}
      >
        {updateTodo => (
          <React.Fragment>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={e => {
                const done = e.target.checked;
                updateTodo({
                  variables: { id: todo.id, done },
                  // update: onToggleUpdateCacheFactory({ todo, done }),
                  // NOTE may not need update func thanks to cache’s normalization strategy
                  // https://www.apollographql.com/docs/react/essentials/mutations.html#update
                });
              }}
            />
            <input
              value={title}
              onChange={e => {
                const nextTitle = e.target.value;
                setTitle(nextTitle);
                updateTodo({ variables: { id: todo.id, title: nextTitle } });
              }}
            />
          </React.Fragment>
        )}
      </Mutation>
      <DeleteButton todo={todo} />
    </li>
  );
};

export default withUpdateTodo(TodoListItem);
