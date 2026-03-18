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
    <aside className="h-screen w-64 bg-[#0b1220] border-r border-gray-800 flex flex-col">
      
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-800">
        <h1 className="text-xl font-semibold text-white">
          K8s Dashboard
        </h1>
        <span className="text-xs text-green-400 mt-1 block">● LIVE</span>
      </div>

      {/* Links */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-gray-800">
        <button className="w-full text-left text-sm text-gray-400 hover:text-white transition">
          Collapse
        </button>
      </div>
    </aside>
  );
}