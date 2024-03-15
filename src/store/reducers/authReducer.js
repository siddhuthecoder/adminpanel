const initialState = {
    isAuthenticated: false,
    role: null,
  };
  
  const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          role: payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          role: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  