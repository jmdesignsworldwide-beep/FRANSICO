import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false }, // el admin nunca se indexa
};

/**
 * Layout del área /admin: fondo oscuro, sin navbar/footer públicos.
 * La protección de sesión la hace el middleware (server-side).
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-carbon text-offwhite">{children}</div>;
}
