import { Outlet } from "react-router";
import { Navigation } from "../components/Navigation";

export function Root() {
  return (
    <div className="min-h-screen bg-black font-['Work_Sans']">
      <Navigation />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}
