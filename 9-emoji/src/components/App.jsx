import React from "react";
import Entry from "./Entry";
import emojis from "../emojipedia";

function createEntry(emoji) {
  return <Entry key={emoji.id} {...emoji} />;
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">{emojis.map(createEntry)}</dl>
    </div>
  );
}

export default App;
