import { Outlet, useLocation } from "react-router";
import { Navigation } from "../components/Navigation";
import { useSeo } from "../../seo/useSeo";
import seo from "../../seo/routes.json";

export function Root() {
  const { pathname } = useLocation();
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  useSeo(normalized in seo.routes ? normalized : null);

  return (
    <div className="min-h-screen bg-black font-['Work_Sans']">
      <Navigation />
      <main className="pt-28 sm:pt-20">
        <Outlet />
      </main>
    </div>
  );
}
