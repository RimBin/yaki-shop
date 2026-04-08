import ProjectsAdminClient from '@/components/admin/ProjectsAdminClient'
import { AdminBody } from '@/components/admin/ui/AdminUI'
import { requireAdminPage } from '@/lib/admin/require-admin-page'

export default async function AdminProjectsPage() {
  await requireAdminPage('/admin/projects', 'projects')
  return (
    <AdminBody className="pt-[clamp(16px,2vw,24px)]">
      <ProjectsAdminClient />
    </AdminBody>
  )
}
