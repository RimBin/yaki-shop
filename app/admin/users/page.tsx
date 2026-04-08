import { redirect } from 'next/navigation'
import UsersAdminClient from '@/components/admin/UsersAdminClient'
import { AdminBody, AdminCard } from '@/components/admin/ui/AdminUI'
import { requireAdminPage } from '@/lib/admin/require-admin-page'

function looksLikeJwt(value: string | undefined): boolean {
  if (!value) return false
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(value.trim())
}

export default async function AdminUsersPage() {
  if (!looksLikeJwt(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
    return (
      <AdminBody className="pt-[clamp(16px,2vw,24px)]">
        <AdminCard>
          <p className="font-['Outfit'] text-[14px] text-[#535353]">
            Supabase nesukonfigūruotas arba raktai neteisingi. Įrašykite tikrus
            `NEXT_PUBLIC_SUPABASE_ANON_KEY` ir `SUPABASE_SERVICE_ROLE_KEY` į `.env.local`,
            tada paleiskite `npm run demo:bootstrap-users`.
          </p>
        </AdminCard>
      </AdminBody>
    )
  }

  await requireAdminPage('/admin/users', 'users')

  return (
    <AdminBody className="pt-[clamp(16px,2vw,24px)]">
      <AdminCard>
        <UsersAdminClient />
      </AdminCard>
    </AdminBody>
  )
}
