import { useCallback, useContext } from "react";
import authContext from "../context-store/auth-store";
import { uiContext } from "../context-store/ui-store";
const useHttp = (requestFunction, isGet = false) => {
  const uiCtx = useContext(uiContext);
  const authCtx = useContext(authContext);
  const token = authCtx.token;
  const sendRequest = useCallback(
    async (requestData, transformData = null, passHeaders = true) => {
      if (!isGet) {
        uiCtx.updateNotification({
          status: "PENDING",
          message: "Updating data...Please wait!",
        });
      }

      try {
        const headers = passHeaders
          ? {
              "Content-type": "application/json",
              Authorization: token,
            }
          : "";
          console.log({requestData});
        const response = await requestFunction({ ...requestData, headers });
        if (!isGet) {
          uiCtx.updateNotification({
            status: "SUCCESS",
            message: "Successfully updated!",
          });
        }
        if (transformData) {
          transformData(response);
        } else console.log({ response });
      } catch (err) {
        console.log(`${new Date()} ERROR: LOG ${err}`);
        uiCtx.updateNotification({
          status: "ERROR",
          message: err.message,
        });
      }
    },
    [requestFunction, token, uiCtx, isGet]
  );

  return {
    sendRequest,
  };
};

export default useHttp;
