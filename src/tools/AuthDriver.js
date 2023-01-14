import axios from "axios";

const server = axios.create({ baseURL: "http://localhost:8080" });
export const login = (requestData) => {
    console.log({requestData});
    const emailAddress = requestData.emailAddress;
    const password = requestData.password;
  server
    .post("/auth/login", {
      emailAddress,
      password,
    })
    .then((response) => {
      const status = response.status;
      console.log({status});
      if (status === 200) {
        const data = response.data;
        console.log({data});
        return data;
      } else if (status === 401) throw new Error("Invalid credentials!");
      else throw new Error("Something went wrong!");
    });
};

export const register  =  ({ requestData }) => {
  server
    .post("/register", {
      ...requestData,
    })
    .then((response) => {
      const status = response.status;
      if (status === 200) {
        const data = response.data;
        return data;
      } else if (status === 401) throw new Error("Invalid credentials!");
      else throw new Error("Something went wrong!");
    });
};
