import PizzaList from './Pizza/PizzaList';
import PizzaCreate from './Pizza/PizzaCreate';
import PizzaView from './Pizza/PizzaView';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(){
  return(
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PizzaList/>}/>
          <Route path="/Pizza/list" element={<PizzaList/>}/>
          <Route path="/Pizza/create" element={<PizzaCreate/>}/>
          <Route path="/Pizza/view/:id" element={<PizzaView/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
