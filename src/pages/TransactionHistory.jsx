import { useEffect } from "react";
import { useContext } from "react";
import { useState, useRef } from "react";
import authContext from "../context-store/auth-store";
import styles from "./TransactionHistory.module.css";
import TransactionItem from "./TransactionItem";
import axios from "axios";

const TransactionHistory = () => {
  const ctx = useContext(authContext);
  const userId = useRef(ctx.user.userId);
  const token = useRef(ctx.token);

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/transactions/${userId.current}`, {
        headers: {
          Authorization: token.current,
        },
      })
      .then((response) => setTransactions(response.data));
  }, []);

  return (
    <div className={styles.transactions}>
      <div className={styles.sort}>
        <input type="" />
        <button>Sort</button>
      </div>
      {transactions.map((transaction) => {
        return (
          <TransactionItem
            key={transaction.transactionId}
            transaction={transaction}
          />
        );
      })}
    </div>
  );
};

export default TransactionHistory;
