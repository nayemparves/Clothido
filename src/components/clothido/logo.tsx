export function ClothidoLogo({ className = "h-9" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-full w-auto"
        aria-hidden="true"
        fill="none"
      >
        <rect width="40" height="40" rx="7" fill="#282C3F" />
        <path
          d="M10 27c4-1.5 6.5-4.5 7-9M15.5 28.5c4-1.5 6.8-4.8 7.4-9.6M21.5 29.5c3.6-1.4 6.3-4.3 7-8.6"
          stroke="#7BD3EA"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M12.5 13.5 20 10l7.5 3.5L20 17l-7.5-3.5Z"
          fill="#FFFFFF"
        />
        <path
          d="M12.5 13.5v5L20 22v-5M27.5 13.5v5L20 22"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[26px] leading-none tracking-tight text-[#373A3C] font-extrabold select-none">
        CLOTH<span className="font-light">IDO</span>
      </span>
    </span>
  );
}

export function ClothidoLogoWhite({ className = "h-9" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-full w-auto"
        aria-hidden="true"
        fill="none"
      >
        <rect width="40" height="40" rx="7" fill="#FFFFFF" />
        <path
          d="M10 27c4-1.5 6.5-4.5 7-9M15.5 28.5c4-1.5 6.8-4.8 7.4-9.6M21.5 29.5c3.6-1.4 6.3-4.3 7-8.6"
          stroke="#2C9CD6"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path d="M12.5 13.5 20 10l7.5 3.5L20 17l-7.5-3.5Z" fill="#282C3F" />
        <path
          d="M12.5 13.5v5L20 22v-5M27.5 13.5v5L20 22"
          stroke="#282C3F"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[22px] leading-none tracking-tight text-white font-extrabold select-none">
        CLOTH<span className="font-light">IDO</span>
      </span>
    </span>
  );
}
