// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

// USER ACTIONS
export const getUserName = () => {
  return dispatch => {
    const token = localStorage.getItemBy('okta-token-storage');
    dispatch(fetchUserName(JSON.parse(token).idToken.claims.name));
  };
};

export const USER_NAME = 'USER_NAME';
export const fetchUserName = user => {
  return { type: USER_NAME, payload: user };
};

// CALENDAR ACTIONS
// ADMIN TICKETS
