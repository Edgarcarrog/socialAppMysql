const reducer = (state, action) => {
  const objReducer = {
    ADD_USER: () => {
      return {
        ...state,
        user: action.payload,
      };
    },
    GET_OTHER_USERS: () => {
      return {
        ...state,
        otherUsers: action.payload,
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
