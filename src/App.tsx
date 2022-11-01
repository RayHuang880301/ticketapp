import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import ConsumeCard from "./components/ConsumeCard";
import SearchCard from "./components/SearchCard";
import MintCard from "./components/MintCard";

const STYLES = {
  SECTION: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "100vw",
    height: "100vh",
  },
  CONTAINER: {
    display: "flex",
    flexDirection: "row" as "row",
    width: "100vw",
    height: "90vh",
  },
  STORE_BOX: {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "left",
    alignItems: "center",
    width: "50vw",
    height: "100%",
    border: "1px solid #000000",
  },
  CONSUMER_BOX: {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "left",
    alignItems: "center",
    width: "50vw",
    height: "100%",
    border: "1px solid #000000",
  },
};

function App() {
  return (
    <div style={STYLES.SECTION}>
      <Header />
      <div style={STYLES.CONTAINER}>
        <div style={STYLES.STORE_BOX}>
          <MintCard />
          <ConsumeCard />
        </div>
        <div style={STYLES.CONSUMER_BOX}>
          <SearchCard />
        </div>
      </div>
    </div>
  );
}

export default App;
