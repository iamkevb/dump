import React from "react";

function Form(props) {
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      {createInput("password", "Password")}
      {!props.registered && createInput("password", "Confirm Password")}
      <button type="submit">{props.registered ? "Login" : "Register"}</button>
    </form>
  );
}

function createInput(type, placeholder) {
  return <input type={type} placeholder={placeholder} />;
}

export default Form;
