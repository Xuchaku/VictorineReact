import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import Link from "./../../types/Link/Link";
import "./Navigation.scss";
import EnterUser from "./../EnterUser/EnterUser";

type NavigationProps = {
  links: Link[];
};
const activeClassName = "active";

const Navigation: FC<NavigationProps> = ({ links, ...props }) => {
  return (
    <div className="Navigation">
      {links.map((link: Link, key: number) => {
        return (
          <div key={key}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              {link.text}
            </NavLink>
          </div>
        );
      })}
      <EnterUser></EnterUser>
    </div>
  );
};
export default Navigation;
