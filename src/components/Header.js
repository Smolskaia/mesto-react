import React from "react";
import logo from "../images/header-logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип проекта Место"
      />
    </header>
  );
}

export default Header;
