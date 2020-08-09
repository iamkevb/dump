import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "./notes";

export default function App() {
  return (
    <>
      <Header />
      {notes.map(n => <Note key={n.key} {...n}/>)}
      <Footer />
    </>
  );
}
