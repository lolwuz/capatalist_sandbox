import io from 'socket.io-client';

export default url => {
  const events = [
    'create',
    'join',
    'lobby',
    'chat',
    'roll',
    'move',
    'next',
    'build'
  ];

  let socket = null;

  return storeAPI => next => action => {
    const addSocketEvent = (eventName, data) => {
      storeAPI.dispatch({ type: eventName, ...data });
    };

    switch (action.type) {
      case 'START_SOCKET':
        socket = io(url);

        events.forEach(eventName => {
          socket.on(eventName, data => {
            console.log({ eventName, data });

            addSocketEvent(eventName, data);
          });
        });

        socket.on('connect', () => {
          storeAPI.dispatch({ type: 'connect', socket });
        });

        socket.on('disconnect', () => {
          storeAPI.dispatch({ type: 'disconnect' });
        });

        break;

      case 'SEND_MESSAGE':
        if (socket) socket.emit(action.event, action.message);
        break;

      case 'CLOSE_SOCKET':
        if (socket) socket.disconnect();
        break;
      default:
        break;
    }

    return next(action);
  };
};
