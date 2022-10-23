import Home from "./pages/Home";
import Major from "./pages/Major";
import MajorEdit from "./pages/MajorEdit";
import NotFound from "./pages/NotFound";
import NetworkError from "./pages/NetworkError";
import NoPermission from "./pages/NoPermission";
import Student from "./pages/Student";
import Product from "./pages/Product";

const routes = [
  { path: "", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/major", component: <Major /> },
  { path: "/major/:id", component: <MajorEdit /> },
  { path: "/student", component: <Student /> },
  { path: "/network-error", component: <NetworkError /> },
  { path: "/no-permission", component: <NoPermission /> },
  { path: "*", component: <NotFound /> },
  { path: "/products", component: <Product /> },
];

export default routes;
