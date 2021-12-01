import { backendLookup } from "../lookup";

export const apiRegister = (username, email, password, callback) => {
  const data = { username: username, email: email, password: password };
  backendLookup("POST", "/auth/users/", callback, data);
};
