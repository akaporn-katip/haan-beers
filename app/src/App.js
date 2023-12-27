import mug from "./beer-mug-svgrepo-com.svg"
import * as stylex from "@stylexjs/stylex";

const spin = stylex.keyframes({
  "0%": { transform: "translate(0px, 0)" },
  "50%": { transform: "translate(0px, 24px)" },
  "100%": { transform: "translate(0px, 0)" },
});

const s = stylex.create({
  container: {
    textAlign: "center",
  },
  header: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
  logo: {
    height: "40vmin",
    pointerEvents: "none",
    "@media (prefers-reduced-motion: no-preference)": {
      animationName: spin,
      animationIterationCount: "infinite",
      animationDuration: "1s",
      animationTimingFunction: "ease-in-out",
    },
  },
  link: {
    color: "#61dafb",
  },
});

function App() {
  return (
    <div {...stylex.props(s.container)}>
      <header {...stylex.props(s.header)}>
        <img src={mug} {...stylex.props(s.logo)} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          {...stylex.props(s.link)}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
