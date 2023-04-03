import "./App.css";
import Router from "./components/Routes/routes";
import { UidContext } from "./components/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [uid, setUid] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true,
    }).then((res) => setUid(res.data));
  }, [uid, setUid]);
  return (
    <UidContext.Provider value={uid}>
      <Router />
    </UidContext.Provider>
  );
};

export default App;
