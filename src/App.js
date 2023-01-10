import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import authContext from "./context-store/auth-store";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";


function App() {
  const ctx = useContext(authContext);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          {!ctx.isLoggedIn && <Redirect to="/login" />}
          {ctx.isLoggedIn && <Redirect to="/home" />}
        </Route>
        <Route path="/login">
          {!ctx.isLoggedIn && <LoginForm />}
        </Route>
        <Route path="/register">
        {!ctx.isLoggedIn && <RegisterForm />}
        </Route>
        <Route path="/home">
        {ctx.isLoggedIn && <Home />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
