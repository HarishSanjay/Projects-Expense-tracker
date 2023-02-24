import { useContext } from "react";
import { useCallback } from "react";
import { useState } from "react";
import CashChart from "../components/CashChart";
import CashEntryForm from "../components/CashEntryForm";
import Overview from "../components/Overview";
import authContext from "../context-store/auth-store";
import useHttp from "../hooks/useHttp";
import styles from "./Transactions.module.css";
import CashFlow from "../components/CashFlow";

//Page function
const Transactions = (props) => {
  //gets selected month
  const ctx = useContext(authContext);
  const userId = ctx.user.userId;
  const http = useHttp();
  const [updated, setUpdated] = useState(false);

  const [cashFlow, setCashFlow] = useState({
    expense: 0,
    income: 0,
    balance: 0,
  });

  const selectedDateHandler = useCallback(
    (startDate, endDate) => {
      const url = `http://localhost:8080/${userId}/cashFlow/?startDate=${startDate}&endDate=${endDate}`;
      http.sendRequest(
        "GET",
        {},
        url,
        true,
        { showMessage: false },
        setCashFlow
      );
      setUpdated(true);
    },
    [userId, http]
  );

  if (updated) {
    setUpdated(false);
  }

  const cashUpdatedHandler = () => {
    setUpdated(true);
  };

  return (
    <div className={styles.tracker}>
      <Overview selectedDate={selectedDateHandler} />
      <div className={styles.cashFlow}>
        <CashEntryForm update={cashUpdatedHandler} />
        <CashFlow
          expense={cashFlow.expense}
          income={cashFlow.income}
          savings={cashFlow.balance}
        />
        <CashChart cashFlow={cashFlow} />
      </div>
    </div>
  );
};

export default Transactions;
