import { evaluatorEvidenceSections } from '@/data/evaluator-evidence'
import type { IAEvidenceSection } from '@/types/ia'

export async function getMergedEvaluatorEvidenceSections(): Promise<IAEvidenceSection[]> {
  // Keep original screenshots to preserve source resolution and text legibility.
  return evaluatorEvidenceSections
}