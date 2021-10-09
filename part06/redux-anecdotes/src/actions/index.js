import andecdoteServices from "../services/anecdotes";

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdoes = await andecdoteServices.getAll();
    dispatch({
      type: "INITIAL_ANECDOTES",
      payload: anecdoes,
    });
  };
};

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await andecdoteServices.createNew(content);
    dispatch({
      type: "ADD_NEW_ANECDOTE",
      payload: {
        newAnecdote,
      },
    });
  };
};

export const addVote = (votedAnecdote) => {
  return async (dispatch) => {
    const id = votedAnecdote[0].id;
    const newObject = {
      content: votedAnecdote[0].content,
      votes: votedAnecdote[0].votes + 1,
    };
    const response = await andecdoteServices.vote(id, newObject);
    dispatch({
      type: "ADD_VOTE",
      payload: response,
    });
  };
};

export const showNotification = (text, timeInSeconds) => {
  return (dispatch) => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: {
        anecdote: text,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICION",
      });
    }, timeInSeconds * 1000);
  };
};

export const filter = (text) => {
  return {
    type: "APPLY_FILTER",
    payload: {
      text,
    },
  };
};
