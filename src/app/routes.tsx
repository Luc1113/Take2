import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Staff } from "./pages/Staff";
import { Media } from "./pages/Media";
import { IntensivePackages } from "./pages/IntensivePackages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "staff", Component: Staff },
      { path: "media", Component: Media },
      { path: "intensive-packages", Component: IntensivePackages },
    ],
  },
]);
