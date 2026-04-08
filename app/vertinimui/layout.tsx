import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vertinimo įrodymai | Yakiwood',
  description: 'Privatus projekto vertinimo puslapis su kriterijų įrodymais ir screenshot galerijomis.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function EvaluatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}