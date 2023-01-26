import { Header } from "@/components/Header";
import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <div className="bg-white">
      <Header />
      <Outlet />
    </div>
  );
}
