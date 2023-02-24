import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
Chart.register(Tooltip, Title, ArcElement, Legend);

const styles = {
  container: { width: "30%" },
};

function CashChart(props) {
  const cashFlow = props.cashFlow;

  const data = {
    datasets: [
      {
        data: [cashFlow.expense, cashFlow.income, cashFlow.balance],
        backgroundColor: [
          "rgb(243, 188, 188)",
          "rgb(167, 231, 167)",
          "lightblue",
        ],
      },
    ],
    labels: ["Expense", "Income", "Balance"],
  };
  return (
    <div style={styles.container}>
      <Pie data={data} />
    </div>
  );
}

export default CashChart;
