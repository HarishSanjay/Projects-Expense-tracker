import styles from "./TransactionItem.module.css";

const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TransactionItem = (props) => {
  const transaction = props.transaction;
  const date = new Date(transaction.date);
  const expenseClasses =
    transaction.type === "EXPENSE"
      ? styles.transactionItem
      : `${styles.transactionItem} ${styles.income}`;

  return (
    <div className={expenseClasses}>
      <div
        className={styles.transactionDate}
      >{`${date.getDate()} ${Days[date.getDay()]} ${date.getFullYear()}`}</div>
      <div className={styles.type}>{transaction.type}</div>
      <div className={styles.category}>{transaction.category}</div>
      <div className={styles.amount}>Rs.{transaction.amount}</div>
    </div>
  );
};

export default TransactionItem;
