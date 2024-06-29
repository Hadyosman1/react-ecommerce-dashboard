import { createBrowserRouter, RouterProvider } from "react-router-dom";
//----------------- notyf -----------------
import "notyf/notyf.min.css";

import RootLayout from "./layouts/RootLayout";

//----------------- login -----------------
import LoginPage, { loginLoader } from "./pages/LoginPage";

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
import UsersRoot from "./layouts/users-layout/UsersRoot";
import EditUser from "./layouts/users-layout/EditUser";
import AddUser from "./layouts/users-layout/AddUser";
import UsersPage from "./pages/UsersPage";
import ProductsRoot from "./layouts/products-layout/ProductsRoot";
import AddProduct from "./layouts/products-layout/AddProduct";
import EditProduct from "./layouts/products-layout/EditProduct";
import CategoriesRoot from "./layouts/categories-layout/CategoriesRoot";
import AddCategory from "./layouts/categories-layout/AddCategory";
import EditCategory from "./layouts/categories-layout/EditCategory";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "./store/slices/themeSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    loader: loginLoader,
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
        children: [
          {
            index: true,
            element: <ProductsRoot />,
          },
          {
            path: "add_product",
            element: <AddProduct />,
          },
          {
            path: "edit/:id",
            element: <EditProduct />,
          },
        ],
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
            path: "add_user",
            element: <AddUser />,
          },
        ],
      },
      {
        path: "categories",
        element: <CategoriesPage />,
        children: [
          {
            index: true,
            element: <CategoriesRoot />,
          },
          {
            path: "add_category",
            element: <AddCategory />,
          },
          {
            path: "edit/:id",
            element: <EditCategory />,
          },
        ],
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
  const dispatch = useDispatch();

  useEffect(() => {
    const prefersColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark;)"
    ).matches
      ? "dark"
      : "light";

    dispatch(setTheme(localStorage.getItem("theme") || prefersColorScheme));
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
