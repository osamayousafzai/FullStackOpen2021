const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.payload.anecdote;

    case "REMOVE_NOTIFICION":
      return "";

    default:
      return state;
  }
};

export default notificationReducer;
