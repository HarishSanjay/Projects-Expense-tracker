import styles from "./Overview.module.css";
import { useCallback, useState } from "react";

export const months = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const month = new Date().getMonth();
const year = new Date().getFullYear();
const years = [];
for (let i = 2018; i <=2023; i++) {
  years.push(i);
}

//component
const Overview = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(months[month]);
  const [selectedYear, setSelectedYear] = useState(year);

  const monthChangeHandler = useCallback(
    (event) => {
      setSelectedMonth(event.target.value);
      props.selectedMonth(selectedMonth);
    },
    [props, selectedMonth]
  );

  const yearChangeHandler = useCallback(
    (event) => {
      setSelectedYear(event.target.value);
      props.selectedYear(selectedYear);
    },
    [props, selectedYear]
  );


  return (
    <div className={styles.overview}>
      <h2>
        <span className={styles.selectedMonth}>{`${selectedMonth} ${selectedYear}`}</span> Cash Flow
      </h2>
      <div className={styles.month}>
        <select value={selectedMonth} onChange={monthChangeHandler}>
          <option value="All Time">All Time</option>
          {months.map((month) => {
            return (
              <option key={month} value={month}>
                {month}
              </option>
            );
          })}
        </select>

        <select value={selectedYear} onChange={yearChangeHandler}>
          <option value="All Time">All Time</option>
          {years.map((year) => {
            return (
              <option value={year} key={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Overview;
