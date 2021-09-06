import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import NotesPage from "./views/NotesPage";
import { storeUserAndToken } from "./utils";
import { Context } from "./Store";
import ProfilePage from "./views/ProfilePage";

function App() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    storeUserAndToken(dispatch);
  }, [dispatch]);

  const paths = {
    homePage: "/popup.html",
    loginPage: "/login",
    registerPage: "/register",
    notesPage: "/notes",
    profilePage: "/profile",
  };

  const routes = [
    {
      path: paths.homePage,
      exact: true,
      render: () => <HomePage />,
    },
    {
      path: paths.loginPage,
      render: () => <LoginPage />,
    },
    {
      path: paths.registerPage,
      render: () => <RegisterPage />,
    },
    {
      path: paths.notesPage,
      render: () => <NotesPage />,
    },
    {
      path: paths.profilePage,
      render: () => <ProfilePage />,
    },
  ];

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {routes.map((r) => (
          <Route
            path={r.path}
            exact={Boolean(r.exact)}
            render={r.render}
            key={r.path}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
