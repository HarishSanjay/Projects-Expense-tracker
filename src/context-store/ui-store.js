import { createContext, useCallback, useState } from "react";

let closeTimeout;

export const uiContext = createContext({
  notification: null,
  updateNotification: (notification) => {},
  closeNotification: () => {},
});

export const UIProvider = (props) => {
  const [notification, setNotification] = useState(null);

  const closeNotification = useCallback(() => {
    setNotification(null);
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
  }, []);

  const updateNotification = useCallback(
    (notification) => {
      setNotification(notification);
      closeTimeout = setTimeout(closeNotification, 5000);
    },
    [closeNotification]
  );

  return (
    <uiContext.Provider
      value={{ notification, updateNotification, closeNotification }}
    >
      {props.children}
    </uiContext.Provider>
  );
};
