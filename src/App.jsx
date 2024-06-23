import { createBrowserRouter, RouterProvider } from "react-router-dom";
//----------------- notyf -----------------
import "notyf/notyf.min.css";

import RootLayout from "./layouts/RootLayout";

//----------------- login -----------------
import LoginPage from "./pages/LoginPage";

//----------------- forget pass -----------------
import RootForgetPassLayout from "./layouts/forget-pass-layouts/RootForgetPassLayout";
import CahngePass from "./layouts/forget-pass-layouts/CahngePass";
import ConfirmEmail from "./layouts/forget-pass-layouts/ConfirmEmail";

//----------------- home -----------------
import HomePage from "./pages/HomePage";

//----------------- Profile -----------------
import ProfilePage from "./pages/ProfilePage";

//----------------- products -----------------
import ProductsPage from "./pages/ProductsPage";

//----------------- Categories  -----------------
import CategoriesPage from "./pages/CategoriesPage";

//----------------- users -----------------
import UsersRoot from "./layouts/users-layout/Index";
import EditUser from "./layouts/users-layout/EditUser";
import AddUser from "./layouts/users-layout/AddUser";
import UsersPage from "./pages/UsersPage";

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
        children: [
          {
            index: true,
            element: <UsersRoot />,
          },
          {
            path: "edit/:id",
            element: <EditUser />,
          },
          {
            path: "add",
            element: <AddUser />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
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
