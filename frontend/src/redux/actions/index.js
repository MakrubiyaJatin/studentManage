export const getContacts = () => ({
    type: 'GET_STUDENT',
});

export const registerUserAction = (user) => {
    return {
      type: 'REGISTER_USER',
      user
    }
};
export const loginAction = (data) => {
  return {
    type: 'LOGIN',
    data
  }
};