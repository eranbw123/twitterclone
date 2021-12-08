import { backendLookup } from "../lookup";

export const apiRegister = (username, password, callback) => {
  const data = { username: username, password: password };
  backendLookup("POST", "/auth/users/", callback, data);
};

export const apiLogin = (username, password, callback) => {
  const data = { username: username, password: password };
  backendLookup("POST", "/auth/token/login/", callback, data);
};

export const apiUserDetailGeneral = (username, callback) => {
  backendLookup("GET", `/profile/general/${username}/`, callback);
};

export const apiUserDetail = (callback) => {
  backendLookup("GET", "/profile/", callback);
};

export const apiUserUpdate = (
  location,
  bio,
  username,
  email,
  firstName,
  lastName,
  callback
) => {
  const data = {
    location: location,
    bio: bio,
    user: {
      email: email,
      first_name: firstName,
      last_name: lastName,
    },
  };
  if (localStorage.getItem("username") !== username) {
    data.user.username = username;
  }
  backendLookup("POST", "/profile/", callback, data);
};
