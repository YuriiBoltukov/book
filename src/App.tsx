import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <MainPage />
    </div>
  );
}

export default App;
