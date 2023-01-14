import styles from "./CashEntryForm.module.css";
import useInput from "../hooks/use-input";
import { useContext } from "react";
import authContext from "../context-store/auth-store";
import { saveTransaction } from "../tools/TransactionDriver";
import useHttp from "../hooks/use-http";

const validateAmount = (amount) => {
  return !isNaN(amount) && Number(amount) !== 0;
};

const validateText = (category) => {
  return category.trim().length !== 0;
};

const date = new Date().toISOString().substring(0, 10);

//Component
const CashEntryForm = () => {
  const ctx = useContext(authContext);
  const userId = ctx.user.userId;
  const http = useHttp(saveTransaction);
  const dateInput = useInput(validateText, date);
  const typeInput = useInput(validateText, "EXPENSE");
  const categoryInput = useInput(validateText, "");
  const amountInput = useInput(validateAmount, "");

  let formIsValid = false;
  if (categoryInput.isValid && amountInput.isValid) {
    formIsValid = true;
  }
  const cashEntryHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      http.sendRequest({
        transaction: {
          category: categoryInput.value,
          type: typeInput.value,
          amount: amountInput.value,
          userId: userId,
          date: dateInput.value,
        },
      });

      categoryInput.resetInput();
      typeInput.resetInput();
      amountInput.resetInput();
      dateInput.resetInput();
    }
  };

  let spend = typeInput.value === "EXPENSE";
  let spendClassess = `${styles.control} ${spend ? styles.spend : ""}`;
  return (
    <div className={styles.cashForm}>
      <form onSubmit={cashEntryHandler}>
        <div className={spendClassess}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            min="2020-01-01"
            value={dateInput.value}
            onChange={dateInput.inputChangeHandler}
            max={date}
          />
        </div>
        <div className={styles.type}>
          <input
            id="expense"
            type="radio"
            name="type"
            value="EXPENSE"
            defaultChecked={true}
            onChange={typeInput.inputChangeHandler}
          />
          <label htmlFor="expense">Expense</label>
          <input
            id="income"
            type="radio"
            name="type"
            onChange={typeInput.inputChangeHandler}
            value="INCOME"
          />
          <label htmlFor="income">Income</label>
        </div>
        <div className={spendClassess}>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={categoryInput.value}
            onChange={categoryInput.inputChangeHandler}
            onBlur={categoryInput.inputOnBlurHandler}
          />
        </div>
        <div className={spendClassess}>
          <label htmlFor="amount">Enter amount in Rs*</label>
          <input
            type="text"
            id="amount"
            min="1"
            value={amountInput.value}
            onChange={amountInput.inputChangeHandler}
          />
        </div>
        <div className={`${spend ? styles.spend : ""}`}>
          <button type="submit">{`Add ${spend ? "expense" : "income"}`}</button>
        </div>
      </form>
    </div>
  );
};

export default CashEntryForm;
