import { useContext } from "react";
import { useCallback } from "react";
import { useState } from "react";
import CashEntryForm from "../components/CashEntryForm";
import CashFlow from "../components/CashFlow";
import Overview from "../components/Overview";
import authContext from "../context-store/auth-store";
import useHttp from "../hooks/use-http";
import { getCashFlow } from "../tools/TransactionDriver";
import styles from "./Transactions.module.css";

//Page function
const Transactions = (props) => {
  //gets selected month
  const ctx = useContext(authContext);
  const userId = ctx.user.userId;
  const { sendRequest } = useHttp(getCashFlow, true);

  const [cashFlow, setCashFlow] = useState({
    expense: 0,
    income: 0,
    balance: 0,
  });

  const selectedDateHandler = useCallback(
    (startDate, endDate) => {
      console.log("Date handler");
      sendRequest({ userId, startDate, endDate }, setCashFlow);
    },
    [userId, sendRequest]
  );

  return (
    <div className={styles.tracker}>
      <Overview selectedDate={selectedDateHandler} />
      <div className={styles.cashFlow}>
        <CashFlow
          expense={cashFlow.expense}
          income={cashFlow.income}
          savings={cashFlow.balance}
        />
        <CashEntryForm />
      </div>
    </div>
  );
};

export default Transactions;
