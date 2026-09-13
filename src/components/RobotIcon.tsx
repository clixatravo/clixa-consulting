import React from 'react';

/** Un robot : on le reconnaît sans lire comme « quelqu'un qui répond ».
 *  Même dessin que sur clixa.africa. */
export const RobotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 6V3.5" />
    <circle cx="12" cy="2.6" r="1.1" fill="currentColor" stroke="none" />
    <rect x="4" y="6" width="16" height="13" rx="4" />
    <path d="M2 11v3" />
    <path d="M22 11v3" />
    <circle cx="9" cy="11.8" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="15" cy="11.8" r="1.7" fill="currentColor" stroke="none" />
    <path d="M9.5 15.6c1.5 1.1 3.5 1.1 5 0" />
  </svg>
);
