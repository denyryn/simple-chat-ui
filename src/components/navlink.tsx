export default function NavLink({
  label,
  href,
  isActive = false,
  isMinimized = false,
  icon,
}: {
  label: string;
  href: string;
  isActive?: boolean;
  isMinimized?: boolean;
  icon: string;
}) {
  return (
    <li>
      <a
        href={href}
        title={label}
        className={`relative flex items-center min-h-[60px] group hover:cursor-pointer ${
          isMinimized ? "justify-center" : "justify-start"
        }`}
      >
        {/* Gradient background - shown on active/hover */}
        <span
          className={`absolute left-0 h-full bg-gradient-to-r from-green-50 to-transparent transition-all duration-500 ${
            isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
          }`}
        />

        {/* Active indicator */}
        <span
          className={`absolute left-0 w-1 bg-green-500 rounded-r-full transition-all duration-300 ${
            isActive ? "h-full" : "h-0 group-hover:h-full"
          }`}
        />

        {/* Content */}
        <div
          className={`relative z-10 flex items-center px-4 py-2 font-semibold text-black ${
            isMinimized ? "" : "space-x-2"
          }`}
        >
          <img src={icon} alt={`${label} icon`} className="w-5 h-5" />
          <span className={`${isMinimized ? "hidden" : ""}`}>{label}</span>
        </div>
      </a>
    </li>
  );
}
