import { useContext } from "react";
import { uiContext } from "../context-store/ui-store";
import styles from "./Notification.module.css";

const Notification = (props) => {
  const uiCtx = useContext(uiContext);
  const status = props.notification.status;
  const message = props.notification.message;
  let classes = styles.notification;
  switch (status) {
    case "LOADING":
      classes += ` ${styles.loading}`;
      break;
    case "SUCCESS":
      classes += ` ${styles.success}`;
      break;
    case "ERROR":
      classes += ` ${styles.error}`;
      break;
    case "PENDING":
      classes += ` ${styles.loading}`;
      break;
    default:
      throw new Error("Unsupported case");
  }

  return (
    <div className={classes}>
      <h3 className={styles.status}>{status}</h3>
      <p className={styles.message}>{message}</p>
      <button className={styles.cancelButton} onClick={uiCtx.closeNotification}>
        X
      </button>
    </div>
  );
};

export default Notification;
