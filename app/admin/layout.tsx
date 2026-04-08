import type { ReactNode } from 'react';

import AdminPanelHeader from '@/components/admin/AdminPanelHeader';
import { requireAdminPage } from '@/lib/admin/require-admin-page';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { access } = await requireAdminPage('/admin');

  return (
    <div className="yw-admin-scope min-h-screen bg-[#e1e1e1]">
      <AdminPanelHeader access={access} />

      <main className="w-full">{children}</main>
    </div>
  );
}
