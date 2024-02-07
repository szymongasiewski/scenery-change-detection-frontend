import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import SharedLayout from "./pages/SharedLayout";
import Images from "./pages/Images";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="signup" element={<Register />} />
          <Route path="signin" element={<Login />} />
          <Route path="/" element={<SharedLayout />}>
            <Route element={<PersistLogin />}>
              <Route index element={<Home />} />
              <Route element={<RequireAuth />}>
                <Route path="images" element={<Images />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
