import React from "react";
import moment from "moment";

export default function Footer() {
  return (
    <footer>
      <p>{copyrightText()}</p>
    </footer>
  );
}

function copyrightText() {
  const date = moment().format('MMMM Do YYYY');
  return `Copyright ${date}`;
}
