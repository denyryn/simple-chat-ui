import Sidenav from "../components/Sidenav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex md:p-4 gap-4">
      <Sidenav />
      {children}
    </div>
  );
}
