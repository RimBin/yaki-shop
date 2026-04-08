export interface IAOfficialRow {
  pointLabel: string
  pointId: string
  anchorId: string
  status: string
  evidence: string
  explanation: string
  publicUrls: string[]
  attachments: string[]
  level: number
}

export interface IAReportDraftRow {
  pointId: string
  classification: string
  implementationNature: string
  recommendedTag: string
  doneSummary: string
  changeExplanation: string
  missingEvidence: string
  requiresBackendEvidence: boolean
}

export interface IAEvidenceScreenshot {
  src: string
  fileName: string
  alt: string
  caption: string
}

export interface IAEvidenceUiLink {
  label: string
  href: string
}

export interface IAEvidenceGroup {
  title: string
  description: string
  screenshots: IAEvidenceScreenshot[]
  uiLinks?: IAEvidenceUiLink[]
}

export interface IAEvidenceSection {
  id: string
  pointLabel: string
  title: string
  status?: string
  summary: string
  notes?: string[]
  uiLinks?: IAEvidenceUiLink[]
  screenshots: IAEvidenceScreenshot[]
  evidenceGroups?: IAEvidenceGroup[]
}
