import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import SharedLayout from "./components/SharedLayout";
import RequireAuth from "./features/auth/RequireAuth";
import History from "./pages/History";
import PersistLogin from "./features/auth/PersistLogin";
import Profile from "./pages/Profile";
import DeleteAccount from "./pages/DeleteAccount";
import ChangePassword from "./pages/ChangePassword";
import ChangeDetectionApp from "./pages/ChangeDetectionApp";
import VerifyEmail from "./pages/VerifyEmail";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Register />} />
        <Route path="signin" element={<Login />} />
        <Route path="verify-email/:id" element={<VerifyEmail />} />
        <Route path="password-reset" element={<PasswordResetRequest />} />
        <Route
          path="password-reset-confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        />
        <Route path="/" element={<SharedLayout />}>
          <Route element={<PersistLogin />}>
            <Route index element={<Home />} />
            <Route element={<RequireAuth />}>
              <Route path="change-detection" element={<ChangeDetectionApp />} />
              <Route path="profile" element={<Profile />} />
              <Route path="delete-account" element={<DeleteAccount />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="history" element={<History />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
