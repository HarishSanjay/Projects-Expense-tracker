import { useEffect } from "react";
import { useContext } from "react";
import { useState, useRef } from "react";
import authContext from "../context-store/auth-store";
import styles from "./TransactionHistory.module.css";
import axios from "axios";
import { uiContext } from "../context-store/ui-store";
import { useCallback } from "react";
import { useReducer } from "react";
import Modal from "../ui/Modal";
import CashEntryForm from "../components/CashEntryForm";
import Button from "../ui/Button";
import { months } from "../components/Overview";

const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const modalReducer = (state, actions) => {
  switch (actions.type) {
    case "DISPLAY":
      return { displayModal: true, transaction: { ...actions.transaction } };
    case "CLOSE":
      return { displayModal: false, transaction: null };
    default:
      return { displayModal: false, transaction: null };
  }
};

//component
const TransactionHistory = () => {
  const ctx = useContext(authContext);
  const uiCtx = useContext(uiContext);
  const userId = useRef(ctx.user.userId);
  const token = useRef(ctx.token);
  const [updated, SetUpdated] = useState(true);
  const [modal, dispatch] = useReducer(modalReducer, {
    displayModal: false,
    transaction: null,
  });
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if (updated) {
      axios
        .get(`http://localhost:8080/transactions/${userId.current}`, {
          headers: {
            Authorization: token.current,
          },
        })
        .then((response) => setTransactions(response.data));
      SetUpdated(false);
    }
  }, [updated]);

  const deleteTransactionHandler = useCallback(
    (transactionId) => {
      uiCtx.updateNotification({
        status: "PENDING",
        message: "Deleting transaction. Please wait!",
      });
      axios
        .delete(
          `http://localhost:8080/${userId.current}/transactions/${transactionId}`,
          {
            headers: {
              Authorization: token.current,
            },
          }
        )
        .then((response) => {
          const status = response.status;
          if (status === 204) {
            uiCtx.updateNotification({
              status: "SUCCESS",
              message: "Successfully deleted the transaction",
            });

            SetUpdated(true);
          }
        })
        .catch((err) => {
          uiCtx.updateNotification({
            status: "ERROR",
            message: "Something went wrong! Please try again",
          });
        });
    },
    [uiCtx]
  );

  const editTransactionHandler = (transaction) => {
    dispatch({ type: "DISPLAY", transaction });
  };

  const closeOverlayHandler = (updated) => {
    dispatch({ type: "CLOSE" });
    if (updated) {
      SetUpdated(true);
    }
  };

  return (
    <div className={styles.transactions}>
      {modal.displayModal && (
        <Modal onClose={closeOverlayHandler}>
          <CashEntryForm
            update={true}
            transaction={modal.transaction}
            onClose={closeOverlayHandler}
          />
        </Modal>
      )}
      <table className={styles.table}>
        <thead className={styles.tHead}>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount (Rs)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const date = new Date(transaction.date);
            const expenseClasses =
              transaction.type === "EXPENSE"
                ? styles.transactionItem
                : `${styles.transactionItem} ${styles.income}`;
            return (
              <tr className={expenseClasses} key={transaction.transactionId}>
                <td>{`${date.getDate()} ${
                  months[date.getMonth()]
                } ${date.getFullYear()} (${Days[date.getDay()]})`}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td className={styles.action}>
                  <Button
                    className={styles.editButton}
                    title="Edit"
                    onClick={editTransactionHandler.bind(this, transaction)}
                  />
                  <Button
                    title="Delete"
                    className={styles.deleteButton}
                    onClick={deleteTransactionHandler.bind(
                      this,
                      transaction.transactionId
                    )}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
