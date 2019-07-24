import * as React from 'react';
import { graphql, Mutation } from 'react-apollo';
import { getTodos as GET_TODOS, addTodo as ADD_TODO } from '../queries';

/**
 * hoc to provide mutate function and apollo props (e.g. data, loading, error)
 *   https://www.apollographql.com/docs/react/api/react-apollo/#graphqlquery-configcomponent
 */
const withAddTodo = graphql(ADD_TODO, {
  options: {
    ignoreResults: false, // set true would ignore `data`, `loading` in render prop
  },
  // props mapper, like mapStateToProps
  props: ({ mutate, ...otherProps }) => ({
    addTodo: (title) /* :string */ =>
      mutate({
        variables: { title },
        update: (cache, { data: { addTodo: newTodo } }) => {
          // update func: called after SUCCESSFUL mutation, can access Mutation props
          // NOTE: update cache to update UI
          const { todos: prevTodos } = cache.readQuery({
            query: GET_TODOS,
          });
          cache.writeQuery({
            query: GET_TODOS,
            data: { todos: [newTodo, ...prevTodos] },
          });
        },
      }),
    ...otherProps,
  }),
});

const AddTodoForm = ({ addTodo, data, loading, error }) => {
  if (data) console.info(` ✅ ${data.addTodo.title} added`);

  const [title, setTitle] = React.useState('');
  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault();
          await addTodo(title);
          setTitle('');
        }}
      >
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <button type="submit">{`➕Add Todo`}</button>
        {loading && <span>{`🔄 Adding...`}</span>}
        {error && <span>{` ❌ Error `}</span>}
        {data && <span>{`✅`}</span>}
      </form>
    </div>
  );
};

/**
 * Alternative: AddTodo Component using render prop API of `Mutation`
 *   e.g. export default AddTodoWithRenderProp
 */
export const AddTodoWithRenderProp = () => (
  <Mutation mutation={ADD_TODO} ignoreResults={false}>
    {(
      addTodo, // mutate function; refers to the mutation `myAddTodo`
      { data, loading, error },
    ) => {
      const inputRef = React.createRef();
      if (data) console.info(` ✅ ${data.addTodo.title} added`);
      return (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addTodo({
                variables: { title: inputRef.current.value },
                update: (cache, { data: { addTodo: newTodo } }) => {
                  // update func: called after SUCCESSFUL mutation, can access Mutation props
                  // NOTE: update cache to update UI
                  const { todos: prevTodos } = cache.readQuery({
                    query: GET_TODOS,
                  });
                  cache.writeQuery({
                    query: GET_TODOS,
                    data: { todos: [newTodo, ...prevTodos] },
                  });
                },
              });
              inputRef.current.value = '';
            }}
          >
            <input ref={inputRef} />
            <button type="submit">{`➕Add Todo`}</button>
            {loading && <span>{`🔄 Adding...`}</span>}
            {error && <span>{` ❌ Error `}</span>}
            {data && <span>{`✅`}</span>}
          </form>
        </div>
      );
    }}
  </Mutation>
);

// export default withAddTodo(AddTodoForm);
export default AddTodoWithRenderProp;
