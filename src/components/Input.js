import React from "react";

const Input = ({ handleChange, placeholder, value }) => (
  <input onChange={handleChange} placeholder={placeholder} value={value} />
);

export default Input;
