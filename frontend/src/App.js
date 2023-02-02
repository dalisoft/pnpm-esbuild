import logo from "./logo.svg";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

import { Button } from "@shared/ui/components/Button/Button";

function App() {
  const id = useMemo(() => uuiv4(), []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          ID: {id}
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <Button>This is shared button component</Button>
      </header>
    </div>
  );
}

export default App;
