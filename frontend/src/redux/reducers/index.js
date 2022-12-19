const reducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_STUDENT":
      return { ...state, loading: true };
    case "GET_STUDENT_SUCCESS":
      return { ...state, data: action.data, loading: false };
    case "GET_STUDENT_ERROR":
      return { ...state, error: action.error, loading: false };

      case "LOGIN":
        return { ...state, loading: true };
      case "LOGIN_SUCCESS":
        return { ...state, data: action.data, loading: false };
      case "LOGIN_ERROR":
        return { ...state, error: action.error, loading: false };

    case "REGISTER_USER":
        return { ...state, loading: true };  
    case "REGISTER_USER_SUCCESS":
      return { ...state, data: action.data, error:"", loading: false };
    case "REGISTER_USER_ERROR":
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default reducer;
