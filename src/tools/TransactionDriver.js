import axios from "axios";

const server = axios.create({ baseURL: "http://localhost:8080/transactions" });

export const saveTransaction = async (requestData) => {
  await server
    .post(
      "/",
      { ...requestData.transaction },
      {
        headers: {
          ...requestData.headers,
        },
      }
    )
    .then((response) => {
      if (response.status !== 202) {
        throw new Error("Something went wrong!");
      }
    });
};

export const getCashFlow = async (requestData) => {
  const userId = requestData.userId;
  const startDate = requestData.startDate;
  const endDate = requestData.endDate;
  const response = await server.get(
    `/${userId}/cashFlow/?startDate=${startDate}&endDate=${endDate}`,
    {
      headers: requestData.headers,
    }
  );
  if (response.status === 200) {
    const data = await response.data;
    return data;
  } else throw new Error("Something went wrong!");
};

export const getTransactions = async (requestData) => {
  const userId = requestData.userId;
  const response = await server.get(`/${userId}/`);
  if (response.status === 200) {
    const data =  await response.data;
    return data;
  } else throw new Error("Something went wrong!");
};
