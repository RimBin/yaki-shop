import {
  adminPermissionsToSections,
  canAccessAdminSection,
  getAdminAccessProfile,
  getDefaultAdminLandingSection,
  normalizeAdminPermissions,
  type AdminAccessProfile,
} from './permissions'

describe('admin permissions', () => {
  function createAccessProfile(overrides: Partial<AdminAccessProfile> = {}): AdminAccessProfile {
    return {
      role: 'manager',
      adminSections: [],
      adminPermissions: {},
      isFallbackAdmin: false,
      isPrivileged: true,
      ...overrides,
    }
  }

  it('filters invalid and none values when normalizing permission map', () => {
    expect(
      normalizeAdminPermissions({
        products: 'view',
        projects: 'manage',
        seo: 'none',
        unknown: 'manage',
        posts: 'invalid',
      })
    ).toEqual({
      products: 'view',
      projects: 'manage',
    })
  })

  it('allows viewing but not managing when section permission is view', () => {
    const access = createAccessProfile({
      adminPermissions: {
        products: 'view',
      },
      adminSections: adminPermissionsToSections({
        products: 'view',
      }),
    })

    expect(canAccessAdminSection(access, 'products', 'view')).toBe(true)
    expect(canAccessAdminSection(access, 'products', 'manage')).toBe(false)
  })

  it('allows both viewing and managing when section permission is manage', () => {
    const access = createAccessProfile({
      adminPermissions: {
        projects: 'manage',
      },
      adminSections: adminPermissionsToSections({
        projects: 'manage',
      }),
    })

    expect(canAccessAdminSection(access, 'projects', 'view')).toBe(true)
    expect(canAccessAdminSection(access, 'projects', 'manage')).toBe(true)
  })

  it('grants full access to admins and uses first allowed landing section for managers', () => {
    const adminAccess = createAccessProfile({
      role: 'admin',
      isPrivileged: true,
    })

    const managerAccess = createAccessProfile({
      adminPermissions: {
        seo: 'view',
      },
      adminSections: ['seo'],
    })

    expect(canAccessAdminSection(adminAccess, 'users', 'manage')).toBe(true)
    expect(getDefaultAdminLandingSection(managerAccess)).toBe('dashboard')
  })

  it('falls back to auth metadata permissions when profile columns are unavailable', async () => {
    const supabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            maybeSingle: jest
              .fn()
              .mockResolvedValueOnce({ error: { message: 'column admin_permissions does not exist' }, data: null })
              .mockResolvedValueOnce({ error: { message: 'column admin_sections does not exist' }, data: null })
              .mockResolvedValueOnce({ error: { message: 'column role does not exist' }, data: null }),
          })),
        })),
      })),
    }

    const access = await getAdminAccessProfile(
      supabase as never,
      {
        id: 'manager-1',
        email: 'manager@example.com',
        user_metadata: {
          role: 'manager',
          admin_permissions: {
            products: 'view',
            posts: 'manage',
          },
        },
      }
    )

    expect(access.role).toBe('manager')
    expect(access.adminPermissions).toEqual({
      products: 'view',
      posts: 'manage',
    })
    expect(access.adminSections).toEqual(['products', 'posts'])
    expect(canAccessAdminSection(access, 'posts', 'manage')).toBe(true)
    expect(canAccessAdminSection(access, 'products', 'manage')).toBe(false)
  })
})