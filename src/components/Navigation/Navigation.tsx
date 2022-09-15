import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import Link from "./../../types/Link/Link";
import "./Navigation.scss";

type NavigationProps = {
  links: Link[];
};

const Navigation: FC<NavigationProps> = function ({ links, ...props }) {
  return (
    <div className="Navigation">
      {links.map((link: Link, key: number) => {
        return (
          <div key={key}>
            <NavLink to={link.href}>{link.text}</NavLink>
          </div>
        );
      })}
    </div>
  );
};
export default Navigation;
