import React from 'react';
import Button from './components/atoms/Button/Button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Button classes={`bg-black p-3 outline-none text-white rounded`} type={"button"}> Button</Button>

          <h1 className="text-3xl font-bold underline text-orange-700">
    Hello world!
  </h1>

      </header>
    </div>
  );
}

export default App;
