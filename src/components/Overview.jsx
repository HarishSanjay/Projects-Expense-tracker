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
for (let i = 2020; i <= 2023; i++) {
  years.push(i);
}
const getStartingDate = (month, year) => {
  const monthNumber = months.findIndex((mth) => mth === month) + 1;
  return `${year}-${monthNumber}-1`;
};

const getEndingDate = (month, year) => {
  const monthNumber = months.findIndex((mth) => mth === month) + 1;
  const date = new Date(year, monthNumber, 0);
  return `${year}-${monthNumber}-${date.getDate()}`;
};

//component
const Overview = (props) => {
  const [isInit, setIsInit] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(months[month]);
  const [selectedYear, setSelectedYear] = useState(year);
  console.log({ isInit });

  if (isInit) {
    const startDate = getStartingDate(months[month], year);
    const endDate = getEndingDate(months[month], year);
    props.selectedDate(startDate, endDate);
    setIsInit(false);
  }

  const monthChangeHandler = useCallback(
    (event) => {
      const month = event.target.value;
      setSelectedMonth(month);
      const startDate = getStartingDate(month, selectedYear);
      const endDate = getEndingDate(month, selectedYear);
      props.selectedDate(startDate, endDate);
    },
    [props, selectedYear]
  );

  const yearChangeHandler = useCallback(
    (event) => {
      const year = event.target.value;
      setSelectedYear(year);
      const startDate = getStartingDate(selectedMonth, year);
      const endDate = getEndingDate(selectedMonth, year);
      props.selectedDate(startDate, endDate);
    },
    [props, selectedMonth]
  );

  console.log("Overview render");
  return (
    <div className={styles.overview}>
      <h2>
        <span
          className={styles.selectedMonth}
        >{`${selectedMonth} ${selectedYear}`}</span>{" "}
        Cash Flow
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
