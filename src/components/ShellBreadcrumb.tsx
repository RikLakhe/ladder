"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "./Breadcrumb";

export function ShellBreadcrumb() {
  const pathname = usePathname();
  return <Breadcrumb pathname={pathname} />;
}
