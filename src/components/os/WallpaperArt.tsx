"use client";

/** Illustrated wallpaper — soft editorial silhouette, tasteful & warm. */
export function WallpaperArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="var(--vos-wallpaper-c)" />
            <stop offset="55%" stopColor="var(--vos-wallpaper-a)" />
            <stop offset="100%" stopColor="var(--vos-wallpaper-b)" />
          </linearGradient>
          <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--vos-blush)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--vos-rose)" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="glow" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="var(--vos-amber)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--vos-rose)" stopOpacity="0" />
          </linearGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        <rect width="1440" height="900" fill="url(#sky)" />

        {/* Soft light bloom */}
        <ellipse cx="1080" cy="220" rx="280" ry="200" fill="url(#glow)" opacity="0.7" />
        <circle cx="1180" cy="160" r="90" fill="var(--vos-blush)" opacity="0.15" />

        {/* Abstract floral / curve accents */}
        <path
          d="M80 720 C200 620 260 780 380 700 C480 640 420 520 540 500"
          fill="none"
          stroke="var(--vos-rose)"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          d="M40 780 C160 700 220 820 340 760"
          fill="none"
          stroke="var(--vos-amber)"
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />

        {/* Feminine silhouette — elegant side profile / shoulder curve */}
        <g className="vos-float" style={{ transformOrigin: "1100px 480px" }}>
          {/* Hair cascade */}
          <path
            d="M980 180
               C1020 140 1120 130 1180 180
               C1240 230 1260 320 1230 420
               C1280 380 1320 460 1290 560
               C1260 660 1180 720 1100 740
               C1020 760 960 700 940 620
               C920 540 930 420 960 320
               C970 260 960 210 980 180 Z"
            fill="var(--vos-silhouette-deep)"
            opacity="0.85"
          />
          {/* Neck & shoulder */}
          <path
            d="M1040 420
               C1060 480 1070 540 1085 600
               C1000 620 920 680 880 780
               L1320 780
               C1280 680 1240 620 1180 580
               C1200 500 1180 440 1140 400
               C1110 390 1070 400 1040 420 Z"
            fill="url(#skin)"
          />
          {/* Face profile suggestion */}
          <path
            d="M1080 240
               C1110 230 1145 250 1155 290
               C1165 330 1140 360 1110 370
               C1095 340 1085 300 1080 240 Z"
            fill="var(--vos-silhouette)"
            filter="url(#soft)"
          />
          {/* Soft highlight on shoulder */}
          <ellipse
            cx="1120"
            cy="560"
            rx="70"
            ry="36"
            fill="var(--vos-blush)"
            opacity="0.2"
          />
        </g>

        {/* Foreground veil */}
        <path
          d="M0 820 Q360 760 720 800 T1440 780 L1440 900 L0 900 Z"
          fill="var(--vos-bg)"
          opacity="0.35"
        />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--vos-bg)]/50 via-transparent to-[var(--vos-bg)]/20" />
    </div>
  );
}
