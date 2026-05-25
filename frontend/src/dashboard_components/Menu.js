import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", end: true },
  { to: "/dashboard/orders", label: "Orders" },
  { to: "/dashboard/holdings", label: "Holdings" },
  { to: "/dashboard/positions", label: "Positions" },
  { to: "/dashboard/funds", label: "Funds" },
  { to: "/dashboard/apps", label: "Apps" },
];

const Menu = () => {
  return (
    <nav className="menu-container">
      <ul className="terminal-nav">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "menu selected" : "menu")}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="profile">
        <div className="avatar">TD</div>
        <p className="username mono">PRO</p>
      </div>
    </nav>
  );
};

export default Menu;
