import InventoryAdminClient from '@/components/admin/InventoryAdminClient';
import { requireAdminPage } from '@/lib/admin/require-admin-page';

export default async function AdminInventoryPage() {
  await requireAdminPage('/admin/inventory', 'inventory');

  return <InventoryAdminClient />;
}
