import style from "./Navigation.module.css";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

function Navigation() {
  const location = useLocation();

  // Check active link function
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={classNames(style.navigation, style.container)}>
        <Link to="/">
          <div className={style.logo}>
            <img src="/images/LasLogo.png" alt="logo" />
          </div>
        </Link>
        <div className={style.navBar}>
          <ul>
            <li>
              <Link
                className={classNames(style.this_page, {
                  [style.active]: isActive("/"),
                })}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={classNames(style.this_page, {
                  [style.active]: isActive("/aboutUs"),
                })}
                to="/aboutUs"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className={classNames(style.this_page, {
                  [style.active]: isActive("/contactUs"),
                })}
                to="/contactUs"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.button}>
          <button className={style.login}>
            <Link
              className={classNames(style.loginPage, {
                [style.active]: isActive("/login"),
              })}
              to="/login"
            >
              Login
            </Link>
          </button>
          <button className={style.signup}>
            <Link
              className={classNames(style.loginPage, {
                [style.active]: isActive("/register"),
              })}
              to="/register"
            >
              Sign Up
            </Link>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
