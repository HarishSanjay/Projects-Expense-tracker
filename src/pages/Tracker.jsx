import CashFlow from "../components/CashFlow";
import Overview from "../components/Overview";
import styles from "./Tracker.module.css";

//Page function
const Tracker = (props) => {
  //gets selected month
  const selectedMonthHandler = (month) => {};
  const selectedYearHandler = (year) => {};
  return (
    <div className={styles.tracker}>
      <Overview
        selectedMonth={selectedMonthHandler}
        selectedYear={selectedYearHandler}
      />
      <div className={styles.cashFlow}>
        <CashFlow />
      </div>
    </div>
  );
};

export default Tracker;
