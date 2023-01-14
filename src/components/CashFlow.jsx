import styles from "./CashFlow.module.css";

const CashFlow = (props) => {
  return (
    <div className={styles.cashFlow}>
      <div className={styles.income}>
        <div className={styles.cost}>Rs.{props.income}</div>
        Income
      </div>
      <div className={styles.expense}>
        <div className={styles.cost}>Rs.{props.expense}</div>
        Expense
      </div>
      <div className={styles.savings}>
        <div className={styles.cost}>Rs.{props.savings}</div>
        Balance
      </div>
    </div>
  );
};

export default CashFlow;
