import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./redux/store";
import Login from "./pages/onboarding/Login/Login";
import ApplicationPage from "./pages";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeUser } from "./redux/slices/user";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeUser(JSON.parse(localStorage.getItem("user"))));
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/*" component={ApplicationPage} />
        </Switch>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
