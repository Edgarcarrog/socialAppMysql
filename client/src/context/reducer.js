const reducer = (state, action) => {
  const objReducer = {
    ADD_USER: () => {
      return {
        ...state,
        user: action.payload,
      };
    },
    SET_FOLLOWING: () => {
      return {
        ...state,
        following: action.payload,
      };
    },
    LOGOUT: () => {
      return {
        user: null,
        otherUsers: null,
        hobbies: null,
        following: null,
        followers: null,
      };
    },
  };

  return objReducer[action.type] ? objReducer[action.type]() : state;
};

export default reducer;
