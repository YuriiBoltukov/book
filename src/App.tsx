import React, { useEffect, useState } from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import Header from "./components/Header/Header";
import { Spin, ConfigProvider, theme } from "antd";

function App() {
  const [load, setLoad] = useState(true);
  const { token } = theme.useToken();
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          padding: 8,
          colorBgBase: "#ffffff",
        },
        components: {
          Button: {
            colorPrimary: "#babcc1",
            algorithm: true,
            colorBgContainerDisabled: token.colorBgBase,
          },
          Input: {
            colorPrimary: "green",
            activeBg: token.colorBgBase,
            hoverBg: token.colorBgBase,
            algorithm: true,
            padding: token.padding,
          },
        },
      }}
    >
      <div className="App">
        <Header />
        <MainPage />
        {load ? (
          <div className="spin">
            <Spin tip="Loading" size="large"></Spin>
          </div>
        ) : null}
      </div>
    </ConfigProvider>
  );
}

export default App;
