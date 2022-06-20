import "./App.css";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./components";
import Home from "./container/Home";
import { useEffect } from "react";
import Error from "./components/Error";
import LoadingBar from "react-top-loading-bar";
import { Comments } from "./components";

const App = () => {
  const [progress, setProgress] = useState(0);
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("user") == null &&
      navigate("/login", { replace: true });
  }, []);
  const updateApp = (val) => {
    
    setProgress(val);
  };

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home updateApp={updateApp} />} />
        <Route path="/comments/:id" element={<Comments />} />
      </Routes>
      {/* <Error message="Error"/> */}
    </>
  );
};

export default App;
