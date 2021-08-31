import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store";

export default function Navbar() {
  const [state, dispatch] = useContext(Context);

  const logout = () => {
    chrome.storage.local.set({ jwtToken: "" }, () => {
      dispatch("UNSET_USER_AND_TOKEN");
      // window.location.reload();
      dispatch({ type: "REFRESH" });
    });
  };

  return (
    <div>
      {state.user.id ? (
        <>
          <Link to="/notes">Notes</Link> <Link to="/profile">Profile</Link>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/register">Sign up!</Link> <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
