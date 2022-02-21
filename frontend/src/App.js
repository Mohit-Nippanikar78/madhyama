import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import {Login} from "./components";
import Home from "./container/Home";
import {useEffect} from 'react'

const App = () => {
  let navigate = useNavigate()
  useEffect(() => {
    localStorage.getItem("user") == null && 
    navigate("/login",{replace:true})
  }, [])
  
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
