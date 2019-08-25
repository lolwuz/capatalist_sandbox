export const sendMessage = (event, message) => {
  return { type: 'SEND_MESSAGE', event, message };
};

export const startConnection = () => {
  return { type: 'START_SOCKET' };
};

export const closeConnection = () => {
  return { type: 'CLOSE_SOCKET' };
};
