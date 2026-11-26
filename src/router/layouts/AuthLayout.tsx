import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <Outlet />
    </div>
  );
}
