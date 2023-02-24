import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import authContext from "./context-store/auth-store";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Transactions from "./pages/Transactions";
import Notification from "./components/Notification";
import { uiContext } from "./context-store/ui-store";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  const ctx = useContext(authContext);
  const uiCtx = useContext(uiContext);
  const notification = uiCtx.notification;
  return (
    <>
      <Header />
      {notification && <Notification notification={notification} />}
      <Switch>
        <Route path="/" exact>
          {!ctx.isLoggedIn && <Redirect to="/login" />}
          {ctx.isLoggedIn && <Redirect to="/home" />}
        </Route>
        <Route path="/login">{!ctx.isLoggedIn && <LoginForm />}</Route>
        <Route path="/register">{!ctx.isLoggedIn && <RegisterForm />}</Route>
        {ctx.isLoggedIn && (
          <Route path="/home">
            <Transactions />
          </Route>
        )}
        {ctx.isLoggedIn && (
          <Route path="/transactions">
            <TransactionHistory />
          </Route>
        )}
        <Route path="*" exact>
          {!ctx.isLoggedIn && <Redirect to="/login" />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
