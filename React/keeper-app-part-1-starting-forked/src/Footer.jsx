import React from "react";

//footer
//p

const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <footer>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
};
export default Footer;
