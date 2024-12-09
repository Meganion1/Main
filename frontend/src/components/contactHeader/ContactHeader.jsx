
import style from "./ContactHeader.module.css"
// import classNames from 'classnames'

function ContactHeader() {
  return (
    <div>
      <div className={style.contactSection}>
        <h1>LAST Recipe</h1>
        <p>Traditional Recipes in Town</p>
      </div>
      <div className={style.information}>
        <h3>Contact Us</h3>
        <p>
          <strong>Email:</strong> contact@lastrecipe.com
        </p>
      </div>
    </div>
  );
}

export default ContactHeader;
