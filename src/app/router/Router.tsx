import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Routes } from "src/constants/routes";
import { useAuthContext } from "src/context/auth";
import { HomePage } from "src/pages/home";
import { LoginPage } from "src/pages/login";
import { RegisterPage } from "src/pages/register";

export const homeRouter = createBrowserRouter([
  {
    path: Routes.Any,
    element: <HomePage />,
  },
]);

export const authRouter = createBrowserRouter([
  {
    path: Routes.Any,
    element: <LoginPage />,
  },
  {
    path: Routes.Login,
    element: <LoginPage />,
  },
  {
    path: Routes.Register,
    element: <RegisterPage />,
  },
]);

export const adminRouter = createBrowserRouter([
  {
    path: Routes.Any,
    element: <div>Admin</div>,
  },
]);

const roleToRouterMap: { [key: string]: any } = {
  ADMIN: adminRouter,
  USER: homeRouter,
};

const RouterBase = () => {
  const authContext = useAuthContext();
  const userRole = authContext.user?.role || "USER";
  const router = !authContext.isAuth ? authRouter : roleToRouterMap[userRole];

  return <RouterProvider router={router} />;
};

export const Router = RouterBase;
