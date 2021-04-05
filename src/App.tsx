import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NYTResults from "./components/NYTResults";

function App() {
  return (
    <div className="App">
      <NYTResults />
    </div>
  );
}

export default App;
