import React from "react";
import ConnectBtn from "./ConnectBtn";
import twLogo from "../assets/twLogo.svg";
import dcLogo from "../assets/dcLogo.svg";
import osLogo from "../assets/osLogo.svg";

const STYLES = {
  HEADER: {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100vw",
    height: "10vh",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    padding: "0 5vw",
  },
  MEDIA_BOX: {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "20vw",
  },
};

export default function Header() {
  return (
    <div style={STYLES.HEADER}>
      <div style={STYLES.MEDIA_BOX}>
        <a href="123" target="_blank" rel="noreferrer">
          <img src={twLogo} width={50} height={50} alt="" />
        </a>
        <a href="123" target="_blank" rel="noreferrer">
          <img src={dcLogo} width={50} height={50} alt="" />
        </a>
        <a href="123" target="_blank" rel="noreferrer">
          <img src={osLogo} width={50} height={50} alt="" />
        </a>
      </div>
      <ConnectBtn />
    </div>
  );
}
