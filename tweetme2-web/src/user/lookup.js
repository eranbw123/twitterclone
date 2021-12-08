import { backendLookup } from "../lookup";

export const apiRegister = (username, password, callback) => {
  const data = { username: username, password: password };
  backendLookup("POST", "/auth/users/", callback, data);
};

export const apiLogin = (username, password, callback) => {
  const data = { username: username, password: password };
  backendLookup("POST", "/auth/token/login/", callback, data);
};

export const apiUserDetail = (callback) => {
  backendLookup("GET", "/profile/", callback);
};

export const apiUserUpdate = (
  location,
  bio,
  email,
  firstName,
  lastName,
  callback
) => {
  const data = {
    location: location,
    bio: bio,
    user: { email: email, first_name: firstName, last_name: lastName },
  };
  backendLookup("POST", "/profile/", callback, data);
};
