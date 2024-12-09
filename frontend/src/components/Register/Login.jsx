import React from "react";
import styles from './Register.module.css'
import img from './../../assets/images/login.png'
import { Link } from "react-router-dom";
const LoginPage = () => {
  console.log("login page");

  return (
    <div className={styles.form_container}>
      {/* Login Form */}
      <div className={styles.form_section}>
        <h1>Login</h1>
        <form>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Log In</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register in here </Link> 
        </p>
      </div>
      <div className={styles.imageC}> 

<div className={styles.image}>
<img src={img} alt="a" />

</div>
</div>
    </div>
  );
};

export default LoginPage;
