// App.jsx
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UserList from "./User/UserList";
import UserCreate from "./User/UserCreate";
import UserView from "./User/UserView";
import UserEdit from "./User/UserEdit";
import PageHeader from "./header/PageHeader"; // Import PageHeader

function App() {
  return (
    <BrowserRouter>
      {/* <PageHeader /> Render PageHeader outside of Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserCreate />} />
        <Route path="/users/view/:id" element={<UserView />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;