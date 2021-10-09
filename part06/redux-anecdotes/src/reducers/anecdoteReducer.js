const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIAL_ANECDOTES":
      return action.payload;

    case "ADD_VOTE":
      const anecdoteToVote = state.filter((i) => i.id !== action.payload.id);
      return [...anecdoteToVote, action.payload];

    case "APPLY_FILTER":
      return state.filter((i) => i.content.includes(action.payload.text));

    case "ADD_NEW_ANECDOTE":
      const newAnecdote = action.payload.newAnecdote;
      return [...state, newAnecdote];

    default:
      return state;
  }
};

export default anecdoteReducer;
