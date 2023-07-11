import React, { useState } from "react";

const HomeNav = () => {
  const [relevantToggle, setRelevantToggle] = useState(true);
  const toggleLink = (data) => {
    if (data === "relevant") {
      setRelevantToggle(true);
    } else if (data === "following") {
      setRelevantToggle(false);
    }
  };

  return (
    <nav className="home__nav">
      <div
        className={`home__nav-link ${relevantToggle ? "selected" : null}`}
        onClick={() => toggleLink("relevant")}
      >
        <span>Relevante</span>
      </div>
      <div
        className={`home__nav-link ${!relevantToggle ? "selected" : null}`}
        onClick={() => toggleLink("following")}
      >
        <span>Siguiendo</span>
      </div>
    </nav>
  );
};

export default HomeNav;
