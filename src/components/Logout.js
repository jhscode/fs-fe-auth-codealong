import React from "react";
import { removeToken } from "../services/tokenService";

const Logout = props => {
  const logout = () => {
    removeToken();
    props.setUser(null);
  };
  return <button onClick={logout}>Logout</button>;
};

export default Logout;
