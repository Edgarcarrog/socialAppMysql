const reducer = (state, action) => {
  const objReducer = {
    ADD_USER: () => {
      return {
        ...state,
        user: action.payload,
      };
    },
    DELETE_MY_POST: () => {
      return {
        ...state,
        myposts: state.myposts.filter((post) => post.Id !== action.payload),
      };
    },
    DELETE_USER: () => {
      return {
        ...state,
        user: null,
      };
    },
    SET_ALL_USERS: () => {
      return {
        ...state,
        allUsers: action.payload,
      };
    },
    SET_FOLLOWING: () => {
      return {
        ...state,
        following: action.payload,
      };
    },
    SET_FOLLOWERS: () => {
      return {
        ...state,
        followers: action.payload,
      };
    },
    SET_MY_POSTS: () => {
      return {
        ...state,
        myposts: action.payload,
      };
    },
    SET_POSTS: () => {
      return {
        ...state,
        posts: action.payload,
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

    SHOW_MODAL: () => {
      return {
        ...state,
        modal: action.payload,
      };
    },
  };

  return objReducer[action.type] ? objReducer[action.type]() : state;
};

export default reducer;
