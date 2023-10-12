import React, { useEffect, useState } from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import Header from "./components/Header/Header";
import { Spin } from "antd";

function App() {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const handleLoad = () => {
      setLoad(false);
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  return (
    <div className="App">
      <Header />
      <MainPage />
      {load ? (
        <div className="spin">
          <Spin tip="Loading" size="large"></Spin>
        </div>
      ) : null}
    </div>
  );
}

export default App;
