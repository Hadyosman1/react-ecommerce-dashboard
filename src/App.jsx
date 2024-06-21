import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import ProfilePage from "./pages/ProfilePage";
import RootForgetPassLayout from "./layouts/forget-pass-layouts/RootForgetPassLayout";
import ConfirmEmail from "./layouts/forget-pass-layouts/ConfirmEmail";
import CahngePass from "./layouts/forget-pass-layouts/CahngePass";

//-------
import "notyf/notyf.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "dashboard",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "forget_password",
    element: <RootForgetPassLayout />,
    children: [
      {
        path: "",
        element: <ConfirmEmail />,
      },
      {
        path: "change_password",
        element: <CahngePass />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
