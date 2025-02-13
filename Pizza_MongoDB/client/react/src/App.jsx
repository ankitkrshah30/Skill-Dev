import { BrowserRouter, Route, Routes } from "react-router-dom";
import PizzaList from "./Pizza/PizzaList";
import PizzaCreate from "./Pizza/PizzaCreate";
import PizzaView from "./Pizza/PizzaView";
import PizzaEdit from "./Pizza/PizzaEdit"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PizzaList />} />
        <Route path="/pizzas" element={<PizzaList />} />
        <Route path="/pizzas/create" element={<PizzaCreate />} />
        <Route path="/pizzas/view/:id" element={<PizzaView />} />
        <Route path="/pizzas/edit/:id" element={<PizzaEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

