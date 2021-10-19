import ListProducts from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const ConstantRoutes = [
  {
    path: "/",
    component: ListProducts,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
];

export default ConstantRoutes;
