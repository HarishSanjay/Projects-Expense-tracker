import { useCallback, useContext } from "react";
import authContext from "../context-store/auth-store";
import { uiContext } from "../context-store/ui-store";
import axios from "axios";

function useHttp() {
  const uiCtx = useContext(uiContext);
  const authCtx = useContext(authContext);
  const sendRequest = useCallback(
    async (
      method = "GET",
      payload = {},
      url = "",
      passHeaders = true,
      message = {
        showMessage: true,
        loading: "Sending Request! Please wait",
        success: "Success",
        error: "Something went wrong! Please try again",
      },
      transformData = null
    ) => {
      if (message.showMessage) {
        uiCtx.updateNotification({
          status: "PENDING",
          message: message.loading,
        });
      }
      const headers = passHeaders
        ? { Authorization: authCtx.token, "Content-type": "application/json" }
        : { "Content-type": "application/json" };
      let request;
      switch (method) {
        case "GET":
          request = axios.get(url, { headers: { ...headers } });
          break;
        case "POST":
          request = axios.post(url, payload, { headers: { ...headers } });
          break;
        case "PUT":
          request = axios.put(url, payload, { headers: { ...headers } });
          break;
        case "DELETE":
          request = axios.delete(url, payload, { headers: { ...headers } });
          break;
        default:
          request = null;
      }
      if (request) {
        request
          .then((response) => {
            if (message.showMessage) {
              uiCtx.updateNotification({
                status: "SUCCESS",
                message: message.success,
              });
            }

            if (transformData) {
              transformData(response.data);
            }
          })
          .catch((err) => {
            console.log(
              ` ${new Date().toISOString()} ERROR LOG: ${err.message}`
            );
            uiCtx.updateNotification({
              status: "ERROR",
              message: message.error,
            });
          });
      }
    },
    [uiCtx, authCtx]
  );

  return { sendRequest };
}

export default useHttp;
