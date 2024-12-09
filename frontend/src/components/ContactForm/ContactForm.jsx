import React from "react";
import Button from "../Button/Button";
import style from "./ContactForm.module.css";
import { MdMessage } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { IoMail } from "react-icons/io5";
// import { BsDisplay } from "react-icons/bs";

const ContactForm = () => {

const onViaCallSubmit = () => {
  console.log("I am serina");
}

  return (
    <section className={style.container}>
        <div className={style.all_btn}>
          <div className={style.contact_btn}>
            <Button
              text="VIA SUPPORT CHAT"
              icon={<MdMessage fontSize="24px" />}
            />
            <Button 
            onClick = {onViaCallSubmit}
            text="VIA CALL" icon={<MdCall fontSize="24px" />} />
          </div>
          <Button
            isOutline={true}
            text="VIA EMAIL FORM"
            icon={<IoMail fontSize="24px" />}
          />

          <form>
            <div className={style.form_control}>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" />
            </div>
            <div className={style.form_control}>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" />
            </div>
            <div className={style.form_control}>
              <label  htmlFor="text">Text</label>
              <textarea name="text" rows="8"/>
            </div>
            <div 
            style={{ 
              display:"flex",
              justifyContent:"end"
            }}>
            <Button
            text="SUBMIT"
          />
            </div>
            
          </form>
        </div>
        <div className={style.contact_image}>
          <img src="/images/Contact.svg" alt= "contact_image" />
        </div>
      
    </section>
  );
};

export default ContactForm;
