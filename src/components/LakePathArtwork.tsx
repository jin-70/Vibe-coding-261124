/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function LakePathArtwork() {
  return (
    <div
      className="relative w-full h-full min-h-[260px] lg:min-h-[420px] rounded-xl border border-[#DCE2DA] bg-[#EFF3EE] overflow-hidden flex items-center justify-center p-8"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 480 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[440px]"
      >
        {/* Subtle lakeside contour lines */}
        <path
          d="M-20 260C65 230 140 285 230 255C320 225 385 165 500 185"
          stroke="#CBD5C9"
          strokeWidth="1.25"
        />
        <path
          d="M-20 290C75 262 150 315 245 282C335 250 398 195 500 212"
          stroke="#CBD5C9"
          strokeWidth="1.25"
        />
        <path
          d="M-20 322C88 295 162 345 260 310C348 278 412 228 500 242"
          stroke="#D6DFD4"
          strokeWidth="1"
        />

        {/* Calm lake basin */}
        <path
          d="M62 198C62 142 126 98 214 98C302 98 398 124 406 184C414 244 338 286 244 282C150 278 62 254 62 198Z"
          fill="#E2EAE1"
          stroke="#BFCBBF"
          strokeWidth="1.25"
        />
        <path
          d="M110 194C110 156 158 128 220 128C282 128 346 148 352 186C358 224 302 250 236 248C170 246 110 232 110 194Z"
          fill="#F8F9F7"
          stroke="#C7D3C6"
          strokeWidth="1"
        />

        {/* Continuous walking trail curve */}
        <path
          d="M44 276C104 268 134 218 196 196C258 174 288 124 366 106C404 97 434 102 454 112"
          stroke="#1B4332"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 6"
        />

        {/* Minimalist directional path nodes */}
        <circle cx="88" cy="259" r="5" fill="#F8F9F7" stroke="#1B4332" strokeWidth="2.25" />
        <circle cx="240" cy="176" r="5" fill="#F8F9F7" stroke="#1B4332" strokeWidth="2.25" />
        <circle cx="388" cy="103" r="6.5" fill="#1B4332" />

        {/* Subtle botanical leaf arcs */}
        <path
          d="M148 92C148 72 164 58 184 58C184 78 168 92 148 92Z"
          stroke="#2D6A4F"
          strokeWidth="1.5"
          fill="#E5EDE4"
        />
        <path
          d="M184 58C184 44 196 34 210 34C210 48 198 58 184 58Z"
          stroke="#2D6A4F"
          strokeWidth="1.5"
          fill="#E5EDE4"
        />
        <path
          d="M340 318C340 300 354 288 372 288C372 306 358 318 340 318Z"
          stroke="#2D6A4F"
          strokeWidth="1.5"
          fill="#E5EDE4"
        />

        {/* Gentle horizon lines */}
        <line x1="56" y1="354" x2="424" y2="354" stroke="#D3DDD1" strokeWidth="1" />
        <line x1="120" y1="366" x2="360" y2="366" stroke="#DFE6DD" strokeWidth="1" />
      </svg>
    </div>
  );
}
