import React from "react";
import "./styles.scss";
import logo from "../../images/logo.svg";
export function Header() {
  return (
    <header>
      <img src={logo} alt="Logo Star Wars" />
    </header>
  );
}
