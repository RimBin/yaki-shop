'use client'

import { useEffect, useState } from 'react'

import type { IAEvidenceScreenshot } from '@/types/ia'

// Evaluator screenshots are served from /public/assets/evaluator/ with a short
// cache TTL (see next.config.ts), but browsers may still have old immutable-cached
// versions from before that rule was introduced. Append a version query param to
// force a fresh fetch for any URL that doesn't already carry one.
const EVALUATOR_CACHE_VER = '20260325'

function withCacheBuster(src: string): string {
  if (!src.includes('/assets/evaluator/')) return src
  if (src.includes('v=')) return src
  return src.includes('?') ? `${src}&v=${EVALUATOR_CACHE_VER}` : `${src}?v=${EVALUATOR_CACHE_VER}`
}

type Props = {
  screenshots: IAEvidenceScreenshot[]
  title: string
  closeLabel: string
  previousLabel: string
  nextLabel: string
  openHint: string
}

export default function IAEvidenceScreenshotGallery({
  screenshots,
  title,
  closeLabel,
  previousLabel,
  nextLabel,
  openHint,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [dragOrigin, setDragOrigin] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveIndex(null)
        return
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => {
          if (current === null) return current
          return (current + 1) % screenshots.length
        })
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => {
          if (current === null) return current
          return (current - 1 + screenshots.length) % screenshots.length
        })
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, screenshots.length])

  useEffect(() => {
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    setDragOrigin(null)
  }, [activeIndex])

  useEffect(() => {
    if (activeIndex === null) return

    if (screenshots.length === 0) {
      setActiveIndex(null)
      return
    }

    if (activeIndex > screenshots.length - 1) {
      setActiveIndex(screenshots.length - 1)
    }
  }, [activeIndex, screenshots.length])

  const activeScreenshot = activeIndex === null ? null : screenshots[activeIndex]
  const isZoomed = zoomLevel > 1

  function clampZoom(nextZoomLevel: number) {
    if (nextZoomLevel < 1) return 1
    if (nextZoomLevel > 5) return 5
    return Number(nextZoomLevel.toFixed(2))
  }

  function updateZoom(nextZoomLevel: number) {
    const clampedZoom = clampZoom(nextZoomLevel)
    setZoomLevel(clampedZoom)

    if (clampedZoom === 1) {
      setPanOffset({ x: 0, y: 0 })
      setDragOrigin(null)
    }
  }

  return (
    <>
      <div className="mt-[14px] grid gap-[14px] md:grid-cols-2 xl:grid-cols-3">
        {screenshots.map((screenshot, index) => (
          <button
            key={screenshot.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group overflow-hidden rounded-[18px] border border-[#BBBBBB] bg-white text-left transition-all duration-200 hover:border-[#161616] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            aria-label={`${openHint}: ${screenshot.caption}`}
          >
            <div className="relative aspect-[16/10] bg-[#ECECEC]">
              <img
                src={withCacheBuster(screenshot.src)}
                alt={screenshot.alt}
                draggable="false"
                className="h-full w-full select-none object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#161616]/0 transition-colors duration-200 group-hover:bg-[#161616]/38" />
              <div className="pointer-events-none absolute inset-x-[12px] bottom-[12px] flex items-center justify-between rounded-[14px] border border-white/15 bg-black/15 px-[12px] py-[10px] text-white opacity-0 backdrop-blur-[6px] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                <div>
                  <div className="font-['Outfit'] text-[10px] uppercase tracking-[0.7px] text-white/70">
                    Interaktyvu
                  </div>
                  <div className="mt-[2px] font-['DM_Sans'] text-[18px] leading-none tracking-[-0.72px] text-white">
                    Atidaryti / didinti
                  </div>
                </div>
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 3H3V8M16 3H21V8M21 16V21H16M3 16V21H8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="border-t border-[#E1E1E1] px-[12px] py-[10px]">
              <div className="font-['Outfit'] text-[13px] text-[#161616]">{screenshot.caption}</div>
            </div>
          </button>
        ))}
      </div>

      {activeScreenshot ? (
        <div
          className="fixed inset-0 z-[120] bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex h-screen w-screen flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-[12px] border-b border-white/10 px-[16px] py-[14px] text-white md:px-[24px]">
              <div>
                <div className="font-['Outfit'] text-[12px] uppercase tracking-[0.6px] text-white/70">
                  {title}
                </div>
                <div className="mt-[4px] font-['DM_Sans'] text-[24px] leading-none tracking-[-0.96px] text-white">
                  {activeScreenshot.caption}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="rounded-[100px] border border-white/20 px-[14px] py-[10px] font-['Outfit'] text-[12px] uppercase tracking-[0.6px] text-white transition-colors hover:bg-white/10"
              >
                {closeLabel}
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-black">
              <div className="flex items-center justify-between gap-[12px] border-b border-white/10 px-[16px] py-[10px] text-white/75 md:px-[24px]">
                <div className="font-['Outfit'] text-[11px] uppercase tracking-[0.7px]">
                  Zoom: {Math.round(zoomLevel * 100)}%
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="font-['Outfit'] text-[11px] text-white/65">
                    Ratukas priartina · tempti galima visada
                  </div>
                  <button
                    type="button"
                    onClick={() => updateZoom(1)}
                    className="rounded-[100px] border border-white/20 px-[12px] py-[7px] font-['Outfit'] text-[11px] uppercase tracking-[0.6px] text-white transition-colors hover:bg-white/10"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div
                className={`relative min-h-0 flex-1 overflow-hidden ${
                  dragOrigin ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                onWheel={(event) => {
                  event.preventDefault()
                  updateZoom(zoomLevel + (event.deltaY < 0 ? 0.2 : -0.2))
                }}
                onDoubleClick={() => updateZoom(isZoomed ? 1 : 2)}
                onMouseDown={(event) => {
                  setDragOrigin({
                    x: event.clientX - panOffset.x,
                    y: event.clientY - panOffset.y,
                  })
                }}
                onMouseMove={(event) => {
                  if (!dragOrigin) return
                  setPanOffset({
                    x: event.clientX - dragOrigin.x,
                    y: event.clientY - dragOrigin.y,
                  })
                }}
                onMouseUp={() => setDragOrigin(null)}
                onMouseLeave={() => setDragOrigin(null)}
              >
                <div
                  className="relative h-full w-full"
                  style={{
                    transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                    transition: dragOrigin ? 'none' : 'transform 120ms ease-out',
                  }}
                >
                  <img
                    src={withCacheBuster(activeScreenshot.src)}
                    alt={activeScreenshot.alt}
                    draggable="false"
                    className="pointer-events-none h-full w-full select-none object-contain"
                  />
                </div>
              </div>

              {screenshots.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((current) => {
                        if (current === null) return current
                        return (current - 1 + screenshots.length) % screenshots.length
                      })
                    }
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 rounded-[100px] border border-white/20 bg-black/40 px-[14px] py-[12px] font-['Outfit'] text-[12px] uppercase tracking-[0.6px] text-white transition-colors hover:bg-black/60"
                  >
                    {previousLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((current) => {
                        if (current === null) return current
                        return (current + 1) % screenshots.length
                      })
                    }
                    className="absolute right-[14px] top-1/2 -translate-y-1/2 rounded-[100px] border border-white/20 bg-black/40 px-[14px] py-[12px] font-['Outfit'] text-[12px] uppercase tracking-[0.6px] text-white transition-colors hover:bg-black/60"
                  >
                    {nextLabel}
                  </button>
                </>
              ) : null}
            </div>

            {screenshots.length > 1 ? (
              <div className="grid max-h-[132px] grid-cols-3 gap-[10px] overflow-auto border-t border-white/10 bg-white/5 px-[16px] py-[10px] md:grid-cols-5 md:px-[24px] xl:grid-cols-7">
                {screenshots.map((screenshot, index) => (
                  <button
                    key={screenshot.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`overflow-hidden rounded-[14px] border ${
                      index === activeIndex ? 'border-white' : 'border-white/10'
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full bg-black/40">
                      <img
                        src={withCacheBuster(screenshot.src)}
                        alt={screenshot.alt}
                        draggable="false"
                        className="h-full w-full select-none object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}