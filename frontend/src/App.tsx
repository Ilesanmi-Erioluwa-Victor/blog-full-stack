import React from "react";
import { Routes, Route} from "react-router-dom"
import { Button, Search } from "./components/atoms";

function App() {
  return (
    <Routes>
      <Route  element={<div>Hello world</div>} path="/"/>
      <div className="App">

        <header className="App-header">
          <Button
            classes={`bg-black p-3 outline-none text-white rounded`}
            type={"button"}
          >
            {" "}
            Button
          </Button>

          <h1 className="text-3xl font-bold underline text-orange-700">
            Hello world!
          </h1>
          <Search
            placeholder="Search your content"
            className={"w-[50%]"}
            inputClass={"pr-2"}
            childClasses={"focus:border-none"}
          />
        </header>
      </div>
    </Routes>
  );
}

export default App;
