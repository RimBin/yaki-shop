'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { AdminButton } from '@/components/admin/ui/AdminUI'

export default function IAEvidenceCopyButton({
  anchorId,
  label,
  copiedLabel,
  showUrl = false,
}: {
  anchorId: string
  label: string
  copiedLabel: string
  showUrl?: boolean
}) {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)
  const fallbackUrl = `${pathname}#${anchorId}`
  const [fullUrl, setFullUrl] = useState(fallbackUrl)

  useEffect(() => {
    setFullUrl(`${window.location.origin}${pathname}#${anchorId}`)
  }, [anchorId, pathname])

  async function handleCopy() {
    const copyTarget = `${window.location.origin}${pathname}#${anchorId}`
    await navigator.clipboard.writeText(copyTarget)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  if (showUrl) {
    return (
      <div className="mt-[10px] space-y-[10px]">
        <code className="block break-all rounded-[14px] bg-[#F6F6F6] px-[12px] py-[10px] font-mono text-[13px] text-[#161616]">
          {fullUrl}
        </code>
        <AdminButton variant="outline" size="sm" onClick={handleCopy} className="min-w-[120px]">
          {copied ? copiedLabel : label}
        </AdminButton>
      </div>
    )
  }

  return (
    <AdminButton variant="outline" size="sm" onClick={handleCopy} className="min-w-[120px]">
      {copied ? copiedLabel : label}
    </AdminButton>
  )
}
