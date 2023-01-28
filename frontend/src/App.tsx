import React from 'react';
import Button from './components/atoms/Button/Button';
import NetworkStatus from './components/atoms/NetworkStatus/NetworkStatus';
import Search from './components/atoms/Search/Search';

function App() {
  return (
    <>
    <NetworkStatus>
    <div className="App">
      <header className="App-header">
       <Button classes={`bg-black p-3 outline-none text-white rounded`} type={"button"}> Button</Button>

          <h1 className="text-3xl font-bold underline text-orange-700">
    Hello world!
  </h1>
<Search placeholder='Search your content' className={"w-[50%]"} inputClass={"pr-2"} childClasses={"focus:border-none"}/>
      </header>
    </div>
    </NetworkStatus>
    </>
  );
}

export default App;
