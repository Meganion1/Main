import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import styles from "./Footer.module.css";
// import image from "../src/assets/images/LasLogo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.containerHead5}>
          <div className={styles.container5}>
            <div className={styles.row1}>
              <div className={styles.column}>
              <Link to="/">
              <div className={styles.logoImg}>
                  <img src="./images/LasLogo1.png" alt="logo" />
                </div>
              </Link>
              </div>

              <div className={styles.colum}>
                <h3>Information</h3>
                <p>Team</p>
                <p>Events</p>
                <p>Testimonials</p>
              </div>
              <div className={styles.colum}>
                <h3>Support</h3>
                <p>Phone :+977-1-4620147</p>

                <p>Email :care@dpaisa.com</p>
              </div>
              <div className={styles.colum1}>
                <h3>Code of Conduct</h3>
                <Link className={styles.link} to="/policy">
                  Privacy and Policy
                </Link>
                <p>Terms and Condition</p>
              </div>
              <div className={styles.colum}>
                <h3>Contact Us</h3>
                <p>+977 985252527</p>
                <p>lasRecipe@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            <FaRegCopyright />
            2024 Goldmine Business GroupPvt. Ltd. All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
