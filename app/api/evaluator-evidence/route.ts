import { NextResponse } from 'next/server'

import { getMergedEvaluatorEvidenceSections } from '@/lib/evaluator/evidence'

export async function GET() {
  const sections = await getMergedEvaluatorEvidenceSections()
  return NextResponse.json({ sections })
}