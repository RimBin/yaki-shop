import PostsAdminClient from '@/components/admin/PostsAdminClient';
import { AdminBody, AdminCard } from '@/components/admin/ui/AdminUI';
import { requireAdminPage } from '@/lib/admin/require-admin-page';

export default async function AdminPostsPage() {
  await requireAdminPage('/admin/posts', 'posts');
  return (
    <AdminBody className="pt-[clamp(16px,2vw,24px)]">
      <AdminCard>
        <PostsAdminClient />
      </AdminCard>
    </AdminBody>
  );
}
