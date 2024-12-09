import React from "react";
import styles from "./About.module.css";
import rightImage from "./../../assets/images/rightImage.png";
import mVideo from "./../../assets/images/Mission.mp4"
import imgA from "./../../assets/images/Anish.png"
import imgL from "./../../assets/images/Libina.png"
import imgS from "./../../assets/images/Serina.png"

function AboutUs() {
  return (
    <>
        <div className={styles.left}>
          <div className={styles.left_text}>
           <div className={styles.onlyText}>

            <p className={styles.welcome}>Welcome to LAS Recipe</p>
            <h2>Taste the Magic with LAS Recipe!!!</h2>
            <div className={styles.mainText}>

            <p>Created just now as a fresh idea, LAS Recipe reflects our excitement for innovation and practical solutions. From experimenting with code to curating the best recipes, this platform is the result of teamwork, late-night brainstorming, and a shared passion for food.</p>
            <p>
            LAS Recipe is a passion project brought to life by three college students – Serina, Anish, and Libina – combining creativity, technology, and a love for cooking. Designed to make your culinary adventures easier, our platform is built with a simple yet powerful idea: recommend recipes based on the ingredients you have on hand.
            </p>
            </div>

            </div>
        
          </div>
          <div className={styles.right}>
            <img src={rightImage} alt="rightImage" />
          </div>
        </div>

      <div className={styles.overview}>
        <h1>Overview</h1>
        <p>LAS Recipe is a newly created website developed by three passionate college students —Serina, Anish, and Libina —to simplify cooking and reduce food waste. The platform allows users to input the ingredients they already have at home and receive personalized recipe recommendations, eliminating the hassle of meal planning. Designed with user-friendly navigation and responsive design, LAS Recipe encourages creativity in the kitchen while promoting sustainability. This innovative project, built with dedication and teamwork, serves as a practical tool for anyone looking to make the most of their ingredients and discover new culinary ideas.</p>
      </div>

      <div className={styles.mission}>
        <div className={styles.text}>
          <div className={styles.mission1}>
        <h1>Mission</h1>
<p>Our mission at LAS Recipe is to simplify cooking by recommending recipes based on the ingredients users already have. We aim to reduce food waste, promote sustainability, and inspire creativity in the kitchen.</p>
            <div className={styles.image}>
            <video className={styles.videoControl} controls autoPlay loop muted width="600">
  <source src={mVideo} type="video/mp4" />
</video>
              <div className={styles.text}>
                <h3>Mission</h3>
                <p>Our mission at LAS Recipe is to revolutionize the way people cook and approach meal preparation. By providing a platform that recommends recipes based on available ingredients, we aim to minimize food waste, promote sustainability, and make cooking more accessible and enjoyable for everyone. We are committed to empowering users with innovative tools, fostering creativity in the kitchen, and inspiring a love for home-cooked meals. Through this project, we strive to combine technology and culinary passion to create a meaningful impact on everyday lives.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ourTeam}>
        <div className={styles.text}>
        <h1>Our Team</h1>
          <div className={styles.members}>
              <div className={styles.icon}>
                <div className={styles.img_des}>
                <img src={imgA} alt="Anish" />
                <p> <b>Anish</b> </p>
<p>Backend</p>
                </div>
                <div className={styles.img_des}>
                <img src={imgL} alt="Libina" />
<p><b>Libina</b></p>
<p>Frontend</p>
                </div>
                <div className={styles.img_des}>
                <img src={imgS} alt="Serina" />
<p><b>Serina</b></p>
<p>Frontend</p>

                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
