import { NavLink } from "react-router-dom";

const links = [
  { name: "Overview", path: "/" },
  { name: "Inventory", path: "/inventory" },
  { name: "Posture", path: "/posture" },
  { name: "Activity", path: "/activity" },
  { name: "Policies", path: "/policies" },
];

export function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-[#08111f] border-r border-slate-800 flex flex-col">
      <div className="px-6 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          K8s Dashboard
        </h1>
        <div className="mt-3 text-sm font-medium text-emerald-400">
          ● LIVE
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3.5 text-lg font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-slate-800">
        <button
          type="button"
          className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          Collapse
        </button>
      </div>
    </aside>
  );
}