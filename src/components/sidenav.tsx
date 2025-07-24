import { useState, useRef, useEffect } from "react";
import NavLink from "./navlink";
import Home from "@assets/home.svg";
import Report from "@assets/report.svg";
import Chat from "@assets/chat.svg";
import Menu from "@assets/menu.svg";
import Logout from "@assets/logout.svg";
// import { Menu } from "lucide-react";

const STORAGE_KEY = "sidenav-width";

const Links = [
  { name: "Dashboard", href: "#", icon: Home },
  { name: "Reports", href: "#", icon: Report },
  { name: "Chat", href: "#", icon: Chat, isActive: true },
];

export default function Sidenav() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const minWidth = 80;
  const maxWidth = 400;

  const [width, setWidth] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? Number(stored) : 80;
  });

  const [isResizing, setIsResizing] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth =
        e.clientX - (sidebarRef.current?.getBoundingClientRect().left || 0);
      const constrainedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
      setWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
        document.body.style.userSelect = "";
        localStorage.setItem(STORAGE_KEY, width.toString());
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, width]);

  // Prevent scroll on mobile when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
  }, [isMobileOpen]);

  const isMinimized = width < 200;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 right-4 z-40 md:hidden p-2 bg-white shadow-md rounded"
      >
        <img className="size-6" src={Menu} alt="Toggle Menu" />
      </button>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-white h-screen md:h-[calc(100vh-32px)] rounded-r-xl md:rounded-xl py-6 flex flex-col text-foreground shadow-lg fixed z-40 md:static top-0 left-0 transition-transform duration-300
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ width: `${width}px` }}
      >
        {/* Resize handle (Desktop only) */}
        <div
          className="absolute right-0 top-0 bottom-0 w-3 cursor-e-resize hidden md:block"
          onMouseDown={() => {
            setIsResizing(true);
            document.body.style.userSelect = "none";
          }}
        />

        {/* Profile Section */}
        <div className="flex flex-col items-center gap-3 my-12">
          <div
            className={`bg-green-500 rounded-full transition-all duration-300 ${
              isMinimized ? "size-12" : "size-20"
            }`}
          />
          <h2
            className={`text-xl font-semibold text-black ${
              isMinimized ? "hidden" : ""
            }`}
          >
            Administrator
          </h2>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 w-full">
          <ul className="flex flex-col gap-2">
            {Links.map((link) => (
              <NavLink
                key={link.name}
                label={link.name}
                href={link.href}
                icon={link.icon}
                isMinimized={isMinimized}
                isActive={link.isActive}
              />
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <ul className="flex flex-col gap-2">
          <NavLink
            label="Logout"
            href="#"
            icon={Logout}
            isMinimized={isMinimized}
          />
        </ul>
      </aside>
    </>
  );
}
