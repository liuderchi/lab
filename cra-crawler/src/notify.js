// https://developer.mozilla.org/en-US/docs/Web/API/notification
// Browser notify cation

// TODO: make it hook
export const notify = message => {
  // https://developer.mozilla.org/en-US/docs/Web/API/notification

  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    new Notification(message);
  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        new Notification(message);
      }
    });
  }
};

export default notify;
