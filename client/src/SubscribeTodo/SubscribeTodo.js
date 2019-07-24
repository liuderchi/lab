import * as React from 'react';
import { Subscription } from 'react-apollo';
import { subscribeOnTodoChanged as ON_TODO_CHANGED } from '../queries';

const SubscribeTodo = () => (
  <Subscription
    subscription={ON_TODO_CHANGED}
    // fetchPolicy="cache-and-network" // default: cache-first
  >
    {({ data, loading }) => {
      if (!data) return null;
      const { name, payload: todo } = data.todoChanged;
      // TODO update cache
      return <h4>{!loading && `🔔${name}: ${todo.title}`}</h4>;
    }}
  </Subscription>
);

export default SubscribeTodo;
