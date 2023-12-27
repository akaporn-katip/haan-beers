import logo from "./logo.svg";
import "./App.css";
import * as stylex from "@stylexjs/stylex";

const s = stylex.create({
  container: {
    textAlign: "center",
  },
});

function App() {
  return (
    <div {...stylex.props(s.container)}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
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
