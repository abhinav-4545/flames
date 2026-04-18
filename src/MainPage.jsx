import React, { useState } from "react";
import './App.css';
export const MainPage = () => {
  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [result, setResult] = useState("");
  let flamemap = {
    F: "FRIENDS",
    L: "LOVERS",
    A: "AFFECTIONATE",
    M: "MARRIAGE",
    E: "ENEMIES",
    S: "SIBLINGS"
  };
  const emojiMap = {
  F: "🤝",
  L: "❤️",
  A: "💞",
  M: "💍",
  E: "💔",
  S: "👨‍👩‍👧"
};
function find(fname, sname) {
    let map = {};
    let count = 0;

    // count freq from fname
    for (let c of fname) {
        map[c] = (map[c] || 0) + 1;
    }

    // subtract using sname
    for (let c of sname) {
        map[c] = (map[c] || 0) - 1;
    }

    // calculate total unmatched count
    for (let key in map) {
        count += Math.abs(map[key]);
    }

    let flames = "FLAMES";
    let index = 0;
    if (count === 0) return "S";
    while (flames.length > 1) {
        index = (index + count - 1) % flames.length;

        // remove character at index
        flames = flames.slice(0, index) + flames.slice(index + 1);

        if (index === flames.length) index = 0;
    }

    return flames;
}
return (
<div className="MainPage">
  <h1 className="flames-title">FLAMES</h1>
   <div className="center-box">
  <div className="flames-description">
  <p>Find your bond using the FLAMES game 💖</p>
  </div>
  <div className="names-inputs">
    <input type="text" placeholder="Enter First Name" value={fname} onChange={(e)=>setFname(e.target.value)} />
    <input type="text" placeholder="Enter Second Name" value={sname} onChange={(e)=>setSname(e.target.value)} />
  </div>
  <div className="calculate-button">
    <button onClick={() => {
      const flamesResult = find(fname, sname);
      setResult(flamesResult);
    }}>FIND</button>
  </div>
  <div className="result">
    {result && (<p key={result}>
  <span className="highlight">{flamemap[result]}</span>{emojiMap[result]}
</p>)}
  </div>
  </div>
</div>
);
}

export default MainPage;