import { backendLookup } from "../lookup";

export const apiRegister = (username, email, password, callback) => {
  const data = { username: username, email: email, password: password };
  backendLookup("POST", "/auth/users/", callback, data);
};

export const apiLogin = (username, password, callback) => {
  const data = { username: username, password: password };
  backendLookup("POST", "/auth/token/login", callback, data);
};
