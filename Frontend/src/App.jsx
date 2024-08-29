import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';
import { TestLanding } from "./screens/testLanding";
const App = () => {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<TestLanding />}/>
      <Route path="/game" element = {<Game />}/>
    </Routes>
  </BrowserRouter>
  );
};

export default App;