import React from "react";
import moment from "moment";

export default function Footer() {
  return (
    <footer>
      <p>Copyright {moment().format("MMMM Do YYYY")}</p>
    </footer>
  );
}
