import { useEffect } from "react";

import './home.css';

const Home = ({ setEnterIsPressed }) => {
  useEffect(() => {
    const handleEnter = e => {
      if (e.key === "Enter") {
        setEnterIsPressed(true);
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, []);

  return (
    <section id="home">
      <p>Press Enter</p>
    </section>
  );
}

export default Home;