import styles from "./CashEntryForm.module.css";
import useInput from "../hooks/use-input";
import { useContext } from "react";
import authContext from "../context-store/auth-store";
import useHttp from "../hooks/useHttp";
import Button from "../ui/Button";
import Input from "../ui/Input";

const validateAmount = (amount) => {
  return !isNaN(amount) && Number(amount) !== 0;
};

const validateText = (category) => {
  return category.trim().length !== 0;
};

const date = new Date().toISOString().substring(0, 10);

//Component
const CashEntryForm = (props) => {
  let initTransaction = { date, amount: "", category: "", type: "EXPENSE" };
  const ctx = useContext(authContext);
  const updateTransaction = props.transaction;
  if (updateTransaction) {
    initTransaction = { ...updateTransaction };
  }
  const userId = ctx.user.userId;
  const http = useHttp();
  const dateInput = useInput(validateText, initTransaction.date);
  const typeInput = useInput(validateText, initTransaction.type);
  const categoryInput = useInput(validateText, initTransaction.category);
  const amountInput = useInput(validateAmount, initTransaction.amount);

  let formIsValid = false;
  if (categoryInput.isValid && amountInput.isValid) {
    formIsValid = true;
  }
  const cashEntryHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      const body = {
        category: categoryInput.value,
        type: typeInput.value,
        amount: amountInput.value,
        userId: userId,
        date: dateInput.value,
      };
      const url = `http://localhost:8080/transactions/`;
      if (props.update === true) {
        http.sendRequest(
          "PUT",
          { ...body, transactionId: updateTransaction.transactionId },
          url,
          true,
          {
            showMessage: true,
            loading: "Updating transaction...Please wait",
            success: "Successfully updated transaction!",
            error: "Failed to update transaction....Try again!",
          }
        );
        props.onClose(true);
      } else {
        http.sendRequest("POST", body, url, true, {
          showMessage: true,
          loading: "Saving transaction...Please wait",
          success: "Successfully saved transaction!",
          error: "Failed to save transaction....Try again!",
        });
        props.update();
      }
      dateInput.resetInput();
      categoryInput.resetInput();
      amountInput.resetInput();
    }
  };

  let spend = typeInput.value === "EXPENSE";
  let spendClassess = `${spend ? styles.spend : ""}`;

  return (
    <div className={styles.cashForm}>
      <form onSubmit={cashEntryHandler}>
        <Input
          className={spendClassess}
          type="date"
          label="Date"
          min="2020-01-01"
          value={dateInput.value}
          onChange={dateInput.inputChangeHandler}
          max={date}
        />
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
        <Input
          label="Category"
          type="text"
          hasError={categoryInput.hasError}
          error="Category should not be empty"
          value={categoryInput.value}
          onChange={categoryInput.inputChangeHandler}
          onBlur={categoryInput.inputOnBlurHandler}
        />
        <Input
          className={spendClassess}
          type="text"
          label="Amount in Rs*"
          hasError={amountInput.hasError}
          error="Enter a valid amount"
          onBlur={amountInput.inputOnBlurHandler}
          value={amountInput.value}
          onChange={amountInput.inputChangeHandler}
        />
        <Button
          disabled={!formIsValid}
          type="submit"
          className={`${spend ? styles.spendButton : ""}`}
          title={`Add ${spend ? "expense" : "income"}`}
        />
        {updateTransaction && (
          <Button
            className={styles.cancelButton}
            onClick={props.onClose}
            title="Cancel"
          />
        )}
      </form>
    </div>
  );
};

export default CashEntryForm;
