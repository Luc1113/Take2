import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Staff } from "./pages/Staff";
import { Media } from "./pages/Media";
import { IntensivePackages } from "./pages/IntensivePackages";
import { AdminLogin } from "./pages/AdminLogin";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "staff", Component: Staff },
      { path: "media", Component: Media },
      { path: "build-schedule", Component: IntensivePackages },
      { path: "admin", Component: AdminLogin },
      { path: "*", Component: NotFound },
    ],
  },
]);
