import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import SharedLayout from "./pages/SharedLayout";
import { AuthProvider } from "./context/AuthContext";
import Images from "./pages/Images";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider as AuthProvider2 } from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthProvider2>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Home />} />
              {/* <Route path="images" element={<Images />} /> */}
              <Route path="signup" element={<Register />} />
              <Route path="signin" element={<Login />} />
              <Route element={<RequireAuth />}>
                <Route path="images" element={<Images />} />
              </Route>
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </AuthProvider2>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
