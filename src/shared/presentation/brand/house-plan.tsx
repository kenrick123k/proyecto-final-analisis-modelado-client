export function HousePlan({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="40 20 560 420"
      className={className}
      fill="none"
      stroke="var(--brand-ink)"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <g stroke="var(--brand-line)" strokeWidth="1">
        <path className="plan-line" d="M80 120h460v240H80z" />
        <path className="plan-line" d="M300 120v130" />
        <path className="plan-line" d="M300 250h240" />
        <path className="plan-line" d="M80 250h180" />
        <path className="plan-line" d="M400 250v110" />
      </g>

      <g stroke="var(--brand-line)" strokeWidth="1">
        <path className="plan-line" d="M80 120h30M130 120h30M180 120h30M230 120h30M330 120h40M390 120h40M450 120h40M510 120h30" />
        <path className="plan-line" d="M80 360h30M130 360h40M190 360h40M250 360h40M310 360h50" />
      </g>

      <g stroke="var(--brand-line)" strokeWidth="1">
        <path className="plan-line" d="M300 160a22 22 0 0 1-22 22" />
        <path className="plan-line" d="M180 250a20 20 0 0 0 20 20" />
        <path className="plan-line" d="M400 290a20 20 0 0 1 20-20" />
      </g>

      <g stroke="var(--brand-line)" strokeWidth="1">
        <rect className="plan-line" x="112" y="156" width="84" height="34" rx="3" />
        <path className="plan-line" d="M120 198h68M128 206h52" />
        <ellipse className="plan-line" cx="410" cy="190" rx="46" ry="26" />
        <path className="plan-line" d="M380 240h60M388 232v16M432 232v16" />
        <path className="plan-line" d="M110 268h120v22H110zM118 276h104" />
        <path className="plan-line" d="M440 268h56v56h-56zM448 276h40M448 288h40M448 300h40" />
        <path className="plan-line" d="M460 340h32M476 324v32" />
      </g>

      <g stroke="var(--brand-line)" strokeWidth="1">
        <path className="plan-line" d="M186 120v-18M214 120v-18M186 102h28" />
        <path className="plan-line" d="M80 170H62M80 198H62M80 170v28" />
        <path className="plan-line" d="M540 170h18M540 198h18M540 170v28" />
        <path className="plan-line" d="M470 360v18M498 360v18M470 378h28" />
      </g>

      <g className="plan-fill" fill="var(--brand-accent)">
        <circle cx="516" cy="86" r="30" opacity="0.9" />
      </g>

      <g className="plan-fill" fill="var(--brand-ink-soft)" fontSize="12" fontFamily="var(--font-instrument)" letterSpacing="0.04em">
        <text x="120" y="144">Sala</text>
        <text x="340" y="144">Comedor</text>
        <text x="120" y="286">Cocina</text>
        <text x="416" y="286">Patio</text>
      </g>

      <g className="plan-fill" stroke="var(--brand-line)" strokeWidth="1" fill="var(--brand-ink-soft)">
        <circle cx="566" cy="56" r="14" fill="none" />
        <path d="M566 46v14l6 4" fill="none" />
        <text x="560" y="36" fontSize="11" stroke="none" fontFamily="var(--font-instrument)">
          N
        </text>
      </g>

      <g className="plan-fill" stroke="var(--brand-ink-soft)" strokeWidth="1">
        <path d="M84 404h84M84 399v10M126 399v10M168 399v10" />
      </g>
      <g className="plan-fill" fill="var(--brand-ink-soft)" fontSize="11" fontFamily="var(--font-instrument)">
        <text x="84" y="426">0</text>
        <text x="120" y="426">5 m</text>
      </g>
    </svg>
  );
}
