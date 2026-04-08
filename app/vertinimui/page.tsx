"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

import IAEvidenceScreenshotGallery from '@/components/admin/IAEvidenceScreenshotGallery'
import {
  evaluatorEvidenceAssetRoot,
  evaluatorEvidenceSections,
} from '@/data/evaluator-evidence'
import type { IAEvidenceSection } from '@/types/ia'

function EvidenceUiLinks({
  links,
  heading = 'Tiesioginis įrodymas',
}: {
  links: { label: string; href: string }[]
  heading?: string
}) {
  if (links.length === 0) {
    return null
  }

  return (
    <div className="mt-[14px] flex flex-wrap gap-[10px]">
      <div className="w-full font-['Outfit'] text-[11px] uppercase tracking-[0.6px] text-[#7C7C7C]">
        {heading}
      </div>
      {links.map((uiLink) => (
        <a
          key={`${heading}-${uiLink.href}`}
          href={uiLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-[100px] border border-[#161616] bg-white px-[14px] py-[9px] font-['Outfit'] text-[11px] uppercase tracking-[0.6px] text-[#161616] transition-colors hover:bg-[#161616] hover:text-white"
        >
          {uiLink.label}
        </a>
      ))}
    </div>
  )
}

export default function EvaluatorEvidencePage() {
  const [sections, setSections] = useState<IAEvidenceSection[]>(evaluatorEvidenceSections)

  const getSectionScreenshotCount = (section: IAEvidenceSection) =>
    section.screenshots.length +
    (section.evidenceGroups?.reduce((total, group) => total + group.screenshots.length, 0) ?? 0)

  const [activeSectionId, setActiveSectionId] = useState(evaluatorEvidenceSections[0]?.id ?? '')
  const groupedEvidenceSections = Array.from(
    sections.reduce(
      (groups, section) => {
        const topLevelPoint = section.pointLabel.split('.')[0]
        const existingGroup = groups.get(topLevelPoint)

        if (existingGroup) {
          existingGroup.sections.push(section)
          existingGroup.screenshotCount += getSectionScreenshotCount(section)
          return groups
        }

        groups.set(topLevelPoint, {
          topLevelPoint,
          screenshotCount: getSectionScreenshotCount(section),
          sections: [section],
        })

        return groups
      },
      new Map<
        string,
        {
          topLevelPoint: string
          screenshotCount: number
          sections: IAEvidenceSection[]
        }
      >(),
    ).values(),
  )
  const activeTopLevelPoint =
    sections
      .find((section) => section.id === activeSectionId)
      ?.pointLabel.split('.')[0] ?? groupedEvidenceSections[0]?.topLevelPoint

  useEffect(() => {
    const controller = new AbortController()

    async function loadSections() {
      try {
        const response = await fetch('/api/evaluator-evidence', { signal: controller.signal })
        if (!response.ok) return

        const payload = (await response.json()) as { sections?: IAEvidenceSection[] }
        if (Array.isArray(payload.sections) && payload.sections.length > 0) {
          setSections(payload.sections)
        }
      } catch {}
    }

    void loadSections()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!sections.some((section) => section.id === activeSectionId)) {
      setActiveSectionId(sections[0]?.id ?? '')
    }
  }, [activeSectionId, sections])

  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '')

    if (initialHash) {
      setActiveSectionId(initialHash)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => {
            if (entryB.intersectionRatio !== entryA.intersectionRatio) {
              return entryB.intersectionRatio - entryA.intersectionRatio
            }

            return entryA.boundingClientRect.top - entryB.boundingClientRect.top
          })

        const mostVisibleEntry = visibleEntries[0]

        if (mostVisibleEntry?.target.id) {
          setActiveSectionId(mostVisibleEntry.target.id)
        }
      },
      {
        rootMargin: '-10% 0px -55% 0px',
        threshold: [0.15, 0.3, 0.5, 0.75],
      },
    )

    const observedSections = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null)

    observedSections.forEach((sectionElement) => observer.observe(sectionElement))

    function handleHashChange() {
      const nextHash = window.location.hash.replace('#', '')

      if (nextHash) {
        setActiveSectionId(nextHash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [sections])

  return (
    <main className="min-h-screen bg-[#E1E1E1]">
      <aside className="fixed inset-y-0 left-0 hidden w-[300px] overflow-auto border-r border-[#BBBBBB] bg-white/90 p-[14px] lg:block xl:w-[340px]">
            <nav className="mt-[14px] space-y-[6px]" aria-label="Ataskaitos punktų navigacija">
              {groupedEvidenceSections.map((group) => (
                <details
                  key={group.topLevelPoint}
                  open
                  className={`overflow-hidden rounded-[16px] border bg-white transition-colors ${
                    activeTopLevelPoint === group.topLevelPoint
                      ? 'border-[#161616] shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
                      : 'border-[#D9D9D9]'
                  }`}
                >
                  <summary
                    className={`flex cursor-pointer list-none items-start justify-between gap-[10px] px-[10px] py-[10px] transition-colors [&::-webkit-details-marker]:hidden ${
                      activeTopLevelPoint === group.topLevelPoint ? 'bg-[#161616] text-white' : ''
                    }`}
                  >
                    <div>
                      <div
                        className={`font-['Outfit'] text-[10px] uppercase tracking-[0.7px] ${
                          activeTopLevelPoint === group.topLevelPoint
                            ? 'text-white/65'
                            : 'text-[#7C7C7C]'
                        }`}
                      >
                        Skyrius {group.topLevelPoint}
                      </div>
                      <div
                        className={`mt-[3px] font-['DM_Sans'] text-[18px] leading-none tracking-[-0.72px] ${
                          activeTopLevelPoint === group.topLevelPoint ? 'text-white' : 'text-[#161616]'
                        }`}
                      >
                        {group.topLevelPoint}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-['Outfit'] text-[10px] uppercase tracking-[0.6px] ${
                          activeTopLevelPoint === group.topLevelPoint
                            ? 'text-white/65'
                            : 'text-[#7C7C7C]'
                        }`}
                      >
                        {group.sections.length} punkt.
                      </div>
                      <div
                        className={`mt-[3px] font-['Outfit'] text-[10px] uppercase tracking-[0.6px] ${
                          activeTopLevelPoint === group.topLevelPoint
                            ? 'text-white/65'
                            : 'text-[#7C7C7C]'
                        }`}
                      >
                        {group.screenshotCount} img
                      </div>
                    </div>
                  </summary>
                  <div className="border-t border-[#ECECEC] bg-[#FCFCFC] p-[6px]">
                    {group.sections.map((section) => (
                      <Link
                        key={section.id}
                        href={`#${section.id}`}
                        onClick={() => setActiveSectionId(section.id)}
                        className={`block rounded-[12px] px-[8px] py-[8px] transition-colors ${
                          activeSectionId === section.id
                            ? 'bg-[#161616] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]'
                            : 'hover:bg-white hover:text-[#161616]'
                        }`}
                      >
                        <div
                          className={`font-['Outfit'] text-[10px] uppercase tracking-[0.7px] ${
                            activeSectionId === section.id ? 'text-white/70' : 'text-[#7C7C7C]'
                          }`}
                        >
                          {section.pointLabel}
                        </div>
                        <div
                          className={`mt-[3px] font-['Outfit'] text-[11px] leading-[1.35] ${
                            activeSectionId === section.id ? 'text-white' : 'text-[#161616]'
                          }`}
                        >
                          {section.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </nav>
      </aside>

      <section className="w-full px-[16px] py-[20px] md:px-[28px] md:py-[28px] lg:pl-[332px] xl:px-[40px] xl:py-[32px] xl:pl-[388px]">
        <div className="min-w-0">
            <section className="mb-[18px] rounded-[24px] border border-[#BBBBBB] bg-white/80 p-[14px] lg:hidden">
              <div className="flex flex-col gap-[10px]">
                <div>
                  <div className="font-['Outfit'] text-[10px] uppercase tracking-[0.8px] text-[#7C7C7C]">
                    Greita navigacija
                  </div>
                  <p className="mt-[6px] font-['Outfit'] text-[12px] leading-[1.5] text-[#535353]">
                    Excel nuorodoms naudokite `/vertinimui#punktas-3-3` formatą.
                  </p>
                </div>
                <div className="flex gap-[8px] overflow-x-auto pb-[4px]">
                  {sections.map((section) => (
                    <Link
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setActiveSectionId(section.id)}
                      className={`min-w-[170px] rounded-[16px] border px-[12px] py-[10px] transition-colors ${
                        activeSectionId === section.id
                          ? 'border-[#161616] bg-[#161616] text-white'
                          : 'border-[#D4D4D4] bg-white'
                      }`}
                    >
                      <div
                        className={`font-['Outfit'] text-[10px] uppercase tracking-[0.7px] ${
                          activeSectionId === section.id ? 'text-white/70' : 'text-[#7C7C7C]'
                        }`}
                      >
                        {section.pointLabel}
                      </div>
                      <div
                        className={`mt-[4px] font-['Outfit'] text-[11px] leading-[1.4] ${
                          activeSectionId === section.id ? 'text-white' : 'text-[#161616]'
                        }`}
                      >
                        {section.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <div className="space-y-[18px] md:space-y-[24px]">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-[24px] rounded-[28px] border border-[#BBBBBB] bg-white px-[18px] py-[20px] md:px-[28px] md:py-[28px]"
                >
                  <div className="max-w-[820px]">
                    <div className="font-['Outfit'] text-[12px] uppercase tracking-[0.72px] text-[#7C7C7C]">
                      Ataskaitos punktas {section.pointLabel}
                    </div>
                    <h2 className="mt-[8px] font-['DM_Sans'] text-[30px] leading-[1] tracking-[-1.2px] text-[#161616] md:text-[40px] md:tracking-[-1.6px]">
                      {section.title}
                    </h2>
                    {section.status ? (
                      <div className="mt-[12px] inline-flex rounded-[100px] border border-[#161616] bg-[#161616] px-[12px] py-[8px] font-['Outfit'] text-[11px] uppercase tracking-[0.6px] text-white">
                        {section.status}
                      </div>
                    ) : null}
                    <p className="mt-[14px] font-['Outfit'] text-[15px] leading-[1.7] text-[#535353] md:text-[17px]">
                      {section.summary}
                    </p>
                  </div>

                  {section.notes && section.notes.length > 0 ? (
                    <div className="mt-[18px] rounded-[20px] border border-[#ECECEC] bg-[#FAFAFA] px-[16px] py-[14px]">
                      <div className="font-['Outfit'] text-[11px] uppercase tracking-[0.6px] text-[#7C7C7C]">
                        Papildoma pastaba
                      </div>
                      <ul className="mt-[10px] space-y-[8px] font-['Outfit'] text-[14px] leading-[1.6] text-[#535353]">
                        {section.notes.map((note) => (
                          <li key={note} className="flex gap-[10px]">
                            <span className="mt-[9px] h-[4px] w-[4px] rounded-full bg-[#161616]" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {section.uiLinks && section.uiLinks.length > 0 ? (
                    <EvidenceUiLinks links={section.uiLinks} />
                  ) : null}

                  {section.screenshots.length > 0 ? (
                    <IAEvidenceScreenshotGallery
                      screenshots={section.screenshots}
                      title={`${section.pointLabel} · ${section.title}`}
                      closeLabel="Uždaryti"
                      previousLabel="Ankstesnis"
                      nextLabel="Kitas"
                      openHint="Atidaryti įrodymą"
                    />
                  ) : null}

                  {section.evidenceGroups && section.evidenceGroups.length > 0 ? (
                    <div className="mt-[18px] space-y-[16px] md:space-y-[20px]">
                      {section.evidenceGroups.map((group) => (
                        <div
                          key={`${section.id}-${group.title}`}
                          className="rounded-[24px] border border-[#E5E5E5] bg-[#FCFCFC] px-[16px] py-[16px] md:px-[20px] md:py-[20px]"
                        >
                          <div className="max-w-[900px]">
                            <div className="font-['Outfit'] text-[11px] uppercase tracking-[0.72px] text-[#7C7C7C]">
                              Funkcijos blokas
                            </div>
                            <h3 className="mt-[6px] font-['DM_Sans'] text-[24px] leading-[1.05] tracking-[-0.96px] text-[#161616] md:text-[30px] md:tracking-[-1.2px]">
                              {group.title}
                            </h3>
                            <p className="mt-[10px] font-['Outfit'] text-[15px] leading-[1.7] text-[#535353]">
                              {group.description}
                            </p>
                          </div>

                          {group.uiLinks && group.uiLinks.length > 0 ? (
                            <EvidenceUiLinks links={group.uiLinks} heading="Tiesioginė nuoroda" />
                          ) : null}

                          {group.screenshots.length > 0 ? (
                            <IAEvidenceScreenshotGallery
                              screenshots={group.screenshots}
                              title={`${section.pointLabel} · ${group.title}`}
                              closeLabel="Uždaryti"
                              previousLabel="Ankstesnis"
                              nextLabel="Kitas"
                              openHint="Atidaryti įrodymą"
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : section.screenshots.length === 0 ? (
                    <div className="mt-[18px] rounded-[22px] border border-dashed border-[#BBBBBB] bg-[#F8F8F8] px-[18px] py-[20px]">
                      <div className="font-['DM_Sans'] text-[22px] leading-[1] tracking-[-0.88px] text-[#161616]">
                        Screenshot dar nepridėti
                      </div>
                      <p className="mt-[10px] max-w-[760px] font-['Outfit'] text-[15px] leading-[1.6] text-[#535353]">
                        Šiai sekcijai dar nėra pridėtų vizualinių įrodymų. Jei reikia papildyti nuolatiniais
                        failais repozitorijoje, juos reikia padėti į {evaluatorEvidenceAssetRoot} katalogą ir
                        papildyti [data/evaluator-evidence.ts](c:/Users/rimvy/yakiwood-website/data/evaluator-evidence.ts).
                      </p>
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
        </div>
      </section>
    </main>
  )
}