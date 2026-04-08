import BackupsAdminClient from '@/components/admin/BackupsAdminClient'
import { AdminBody, AdminKicker, AdminSectionTitle, AdminStack } from '@/components/admin/ui/AdminUI'
import { requireAdminPage } from '@/lib/admin/require-admin-page'

export default async function AdminBackupsPage() {
  await requireAdminPage('/admin/backups', 'backups')

  return (
    <AdminBody className="pt-[clamp(16px,2vw,24px)]">
      <AdminStack>
        <div>
          <AdminKicker>Backupai</AdminKicker>
          <div className="mt-[8px]">
            <AdminSectionTitle>Atsarginių kopijų valdymas</AdminSectionTitle>
          </div>
          <p className="mt-[8px] font-['Outfit'] text-[14px] text-[#535353]">
            Valdykite rankinį backup kūrimą, automatinį kūrimo intervalą ir kopijų atkūrimo veiksmus.
          </p>
        </div>

        <BackupsAdminClient />
      </AdminStack>
    </AdminBody>
  )
}