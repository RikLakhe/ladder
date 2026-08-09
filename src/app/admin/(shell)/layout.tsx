import { cookies } from "next/headers";
import { AdminBanner } from "../../../components/AdminBanner";

export default async function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminEmail = cookieStore.get("admin_session")?.value ?? "";

  return (
    <>
      <AdminBanner adminEmail={adminEmail} />
      {children}
    </>
  );
}
