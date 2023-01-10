import styles from "../components/Box.module.css";

const Container = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles}>
        <h4>{props.title}</h4>
        <div>{props.cost}</div>
      </div>
      <div>
        Sort by Month
      </div>
    </div>
  );
};

export default Container;
