import { useContext } from "react";
import authContext from "../context-store/auth-store";
import styles from "./Header.module.css";
import Button from "../ui/Button";
import { NavLink, useHistory } from "react-router-dom";

const Header = () => {
  const ctx = useContext(authContext);
  const isLoggedIn = ctx.isLoggedIn;
  const history = useHistory();

  const logoutHandler = () => {
    ctx.logout();
    history.replace("/login");
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Expense Tracker</h1>
      <nav className={styles.nav}>
        {!isLoggedIn && (
          <NavLink activeClassName={styles.active} to="/login">
            Sign In
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink activeClassName={styles.active} to="/register">
            Sign Up
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink activeClassName={styles.active} to="/home">
            Home
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink activeClassName={styles.active} to="/transactions">
            Transactions
          </NavLink>
        )}
        {isLoggedIn && <Button onClick={logoutHandler} title="Logout" />}
      </nav>
    </div>
  );
};

export default Header;
