export const login = (role,dispatch) => {
  dispatch({type:"LOGIN",payload:role});
}
  
export const logout = (dispatch) => {
  dispatch({type:"LOGOUT"})
};
  