'use client';

const battenSpacingLabel = '600 mm';
const nailInsetLabel = '20 mm';

export default function InstallationAnimation() {
  return (
    <section className="grid gap-[24px] lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,360px)] lg:items-start">
      <div className="overflow-hidden rounded-[28px] border border-[#D8D2CA] bg-[linear-gradient(180deg,#F7F3EE_0%,#F1ECE5_100%)] p-[20px] shadow-[0_20px_60px_rgba(22,22,22,0.08)] sm:p-[28px]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-[#E2DBD2] bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#F4EEE6_58%,#ECE4DA_100%)]">
          <div className="pointer-events-none absolute inset-x-[10%] top-[11%] flex items-center justify-between text-[11px] font-['Outfit'] uppercase tracking-[0.22em] text-[#7F766B] sm:top-[10%] sm:text-[12px]">
            <span className="rounded-full border border-[#D7CDC1] bg-white/80 px-[12px] py-[6px] backdrop-blur-sm">
              Bruselis
            </span>
            <span className="rounded-full border border-[#D7CDC1] bg-white/80 px-[12px] py-[6px] backdrop-blur-sm">
              Bruselis
            </span>
          </div>

          <svg
            viewBox="0 0 800 500"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="mount-batten" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8D6A46" />
                <stop offset="100%" stopColor="#6E4E31" />
              </linearGradient>
              <linearGradient id="mount-board" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2C2721" />
                <stop offset="100%" stopColor="#4C4034" />
              </linearGradient>
              <linearGradient id="mount-nail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5F2EB" />
                <stop offset="100%" stopColor="#B6A99A" />
              </linearGradient>
              <marker id="mount-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 5 L 10 0 L 10 10 z" fill="#9A8B78" />
              </marker>
            </defs>

            <g opacity="0.22">
              <path d="M130 84 H670" stroke="#E2DBD2" strokeWidth="2" strokeDasharray="10 12" />
              <path d="M130 416 H670" stroke="#E2DBD2" strokeWidth="2" strokeDasharray="10 12" />
            </g>

            <rect x="232" y="94" width="60" height="260" rx="20" fill="url(#mount-batten)" />
            <rect x="508" y="94" width="60" height="260" rx="20" fill="url(#mount-batten)" />

            <g className="mount-distance-fade">
              <path d="M262 380 V406" stroke="#B1A293" strokeWidth="3" />
              <path d="M538 380 V406" stroke="#B1A293" strokeWidth="3" />
              <path d="M262 406 H538" stroke="#9A8B78" strokeWidth="3" markerStart="url(#mount-arrow)" markerEnd="url(#mount-arrow)" />
              <rect x="338" y="418" width="124" height="34" rx="17" fill="rgba(255,255,255,0.88)" stroke="#D8CEC3" />
              <text x="400" y="440" textAnchor="middle" fill="#4B4137" fontSize="18" fontFamily="Outfit, sans-serif" letterSpacing="1.5">
                {battenSpacingLabel}
              </text>
            </g>

            <g className="mount-distance-fade">
              <path d="M202 184 H262" stroke="#9A8B78" strokeWidth="2.5" markerStart="url(#mount-arrow)" markerEnd="url(#mount-arrow)" />
              <rect x="186" y="134" width="92" height="32" rx="16" fill="rgba(255,255,255,0.88)" stroke="#D8CEC3" />
              <text x="232" y="155" textAnchor="middle" fill="#4B4137" fontSize="16" fontFamily="Outfit, sans-serif" letterSpacing="1.1">
                {nailInsetLabel}
              </text>

              <path d="M538 184 H598" stroke="#9A8B78" strokeWidth="2.5" markerStart="url(#mount-arrow)" markerEnd="url(#mount-arrow)" />
              <rect x="522" y="134" width="92" height="32" rx="16" fill="rgba(255,255,255,0.88)" stroke="#D8CEC3" />
              <text x="568" y="155" textAnchor="middle" fill="#4B4137" fontSize="16" fontFamily="Outfit, sans-serif" letterSpacing="1.1">
                {nailInsetLabel}
              </text>
            </g>

            <g className="mount-board-group">
              <rect x="180" y="190" width="440" height="96" rx="28" fill="url(#mount-board)" />
              <rect x="198" y="208" width="404" height="10" rx="5" fill="rgba(255,255,255,0.12)" />
              <rect x="198" y="238" width="248" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
              <rect x="198" y="254" width="182" height="8" rx="4" fill="rgba(255,255,255,0.06)" />
            </g>

            <g className="mount-nail-left">
              <rect x="252" y="112" width="20" height="104" rx="10" fill="url(#mount-nail)" />
              <rect x="244" y="106" width="36" height="14" rx="7" fill="#D6CBBD" />
            </g>

            <g className="mount-nail-right">
              <rect x="528" y="112" width="20" height="104" rx="10" fill="url(#mount-nail)" />
              <rect x="520" y="106" width="36" height="14" rx="7" fill="#D6CBBD" />
            </g>

            <circle className="mount-hit-left" cx="262" cy="198" r="14" fill="none" stroke="#D9B58B" strokeWidth="4" />
            <circle className="mount-hit-right" cx="538" cy="198" r="14" fill="none" stroke="#D9B58B" strokeWidth="4" />
          </svg>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#E2DBD2] bg-[#FBF8F4] p-[24px] shadow-[0_18px_48px_rgba(22,22,22,0.05)] sm:p-[28px]">
        <span className="inline-flex rounded-full border border-[#D8CEC3] px-[12px] py-[6px] font-['Outfit'] text-[11px] uppercase tracking-[0.22em] text-[#7F766B]">
          Montavimo seka
        </span>

        <h3 className="mt-[18px] font-['DM_Sans'] text-[28px] font-light leading-[1] tracking-[-1.12px] text-[#161616] sm:text-[34px] sm:tracking-[-1.36px]">
          Lenta prisukama prie dviejų bruselių su aiškiai parodytais tvirtinimo taškais.
        </h3>

        <div className="mt-[20px] space-y-[14px] font-['Outfit'] text-[15px] leading-[1.55] text-[#4F4740]">
          <p>
            Animacija rodo logiką: pirmiausia matomi du bruseliai, tada į savo vietą įskrenda lenta, o galiausiai dvi vinys įsikala į tvirtinimo taškus.
          </p>
          <p>
            Schemoje pažymėti du svarbūs matmenys: atstumas tarp bruselių ir vinies pozicija nuo lentos krašto.
          </p>
        </div>

        <div className="mt-[24px] grid gap-[12px]">
          <div className="rounded-[20px] border border-[#E0D7CC] bg-white px-[16px] py-[14px]">
            <p className="font-['Outfit'] text-[12px] uppercase tracking-[0.18em] text-[#8E806F]">
              Tarpas tarp bruselių
            </p>
            <p className="mt-[4px] font-['DM_Sans'] text-[28px] font-light leading-none text-[#161616]">
              {battenSpacingLabel}
            </p>
          </div>

          <div className="rounded-[20px] border border-[#E0D7CC] bg-white px-[16px] py-[14px]">
            <p className="font-['Outfit'] text-[12px] uppercase tracking-[0.18em] text-[#8E806F]">
              Vinies atitraukimas nuo krašto
            </p>
            <p className="mt-[4px] font-['DM_Sans'] text-[28px] font-light leading-none text-[#161616]">
              {nailInsetLabel}
            </p>
          </div>
        </div>

        <p className="mt-[16px] font-['Outfit'] text-[13px] leading-[1.5] text-[#7A6F63]">
          Jei norėsite, šiuos skaičius galima pakeisti į jūsų tikslų montavimo mazgą ir realius techninius atstumus.
        </p>
      </div>
    </section>
  );
}