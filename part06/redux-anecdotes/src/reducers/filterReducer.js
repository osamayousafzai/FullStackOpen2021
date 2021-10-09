const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "APPLY_FILTER":
      const result = action.payload.text;
      return result;

    default:
      return state;
  }
};

export default filterReducer;
