import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import authContext from "../context-store/auth-store";

const Home = () => {
  const ctx = useContext(authContext);
  const [greetings, setGreetings] = useState("Welcome");
  useEffect(() => {
    if (!!ctx.token) {
      axios
        .get("http://localhost:8080/hello", {
          headers: {
            Authorization: ctx.token,
          },
        })
        .then((response) => {
          setGreetings(response.data);
        });
    }
  }, [ctx.token]);
  return <div>
    <h1>{greetings}</h1>
  </div>
};

export default Home;
