import styles from './landing.module.css';

const PROFILE_POINTS = [
  { name: 'Santa Cruz', altitude: '416 m', x: 110, y: 302 },
  { name: 'Tarija', altitude: '1.854 m', x: 330, y: 205 },
  { name: 'La Paz', altitude: '3.640 m', x: 560, y: 84 },
];

export function AltitudeProfile({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 640 400"
      className={className}
      fill="none"
    >
      <text x="70" y="34" fill="var(--brand-ink-soft)" fontSize="12.5" fontFamily="var(--font-instrument)">
        Perfil de alturas
      </text>

      <g stroke="var(--brand-line)" strokeWidth="1" opacity="0.55">
        <path d="M70 262.5H610" />
        <path d="M70 195H610" />
        <path d="M70 127.5H610" />
      </g>
      <g fill="var(--brand-ink-soft)" fontSize="10.5" fontFamily="var(--font-instrument)" textAnchor="end">
        <text x="62" y="266">1.000</text>
        <text x="62" y="198.5">2.000</text>
        <text x="62" y="131">3.000</text>
      </g>

      <path d="M70 330H610" stroke="var(--brand-line)" strokeWidth="1" />

      <g stroke="var(--brand-line)" strokeWidth="1" strokeDasharray="3 5" opacity="0.8">
        {PROFILE_POINTS.map((point) => (
          <path key={point.name} d={`M${point.x} ${point.y}V330`} />
        ))}
      </g>

      <path
        d={`M${PROFILE_POINTS[0].x} ${PROFILE_POINTS[0].y} L${PROFILE_POINTS[1].x} ${PROFILE_POINTS[1].y} L${PROFILE_POINTS[2].x} ${PROFILE_POINTS[2].y}`}
        stroke="var(--brand-ink)"
        strokeWidth="1.6"
        className={styles.altitudeLine}
      />

      <g className={styles.altitudeMarker}>
        <circle cx="92" cy="54" r="19" fill="var(--brand-accent)" opacity="0.92" />
        {PROFILE_POINTS.map((point) => (
          <g key={point.name}>
            <circle cx={point.x} cy={point.y} r="10" stroke="var(--brand-line)" strokeWidth="1" />
            <circle cx={point.x} cy={point.y} r="4.5" fill="var(--brand-accent)" />
            <text
              x={point.x}
              y={point.y - 17}
              fill="var(--brand-accent)"
              fontSize="12.5"
              fontFamily="var(--font-instrument)"
              textAnchor="middle"
            >
              {point.altitude}
            </text>
            <text
              x={point.x}
              y="354"
              fill="var(--brand-ink)"
              fontSize="16"
              fontFamily="var(--font-fraunces)"
              textAnchor="middle"
            >
              {point.name}
            </text>
          </g>
        ))}
      </g>

      <text
        x="610"
        y="387"
        fill="var(--brand-ink-soft)"
        fontSize="10.5"
        fontFamily="var(--font-instrument)"
        textAnchor="end"
      >
        Altitud en metros sobre el nivel del mar
      </text>
    </svg>
  );
}
