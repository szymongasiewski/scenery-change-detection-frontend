import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import SharedLayout from "./components/SharedLayout";
import Images from "./pages/Images";
// import RequireAuth from "./components/RequireAuth";
import RequireAuth from "./features/auth/RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
// import PersistLogin from "./components/PersistLogin";
import LoginForm from "./features/auth/LoginForm";
import History from "./features/history/History";
import RegisterForm from "./features/auth/RegisterForm";
import PersistLogin from "./features/auth/PersistLogin";

function App() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
      <Routes>
        <Route path="signup" element={<RegisterForm />} />
        <Route path="signin" element={<LoginForm />} />
        <Route path="/" element={<SharedLayout />}>
          <Route element={<PersistLogin />}>
            <Route index element={<Home />} />
            <Route element={<RequireAuth />}>
              <Route path="images" element={<Images />} />
              <Route path="history" element={<History />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;
