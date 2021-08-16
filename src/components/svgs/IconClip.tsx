import React from 'react'
import s from './IconClip.module.scss'

function IconClip({ isFocus, deleteNote }: { isFocus: boolean; deleteNote?: () => void }) {
  return (
    <div className={s.container}>
      <svg
        className={s.clip}
        onClick={deleteNote}
        width="25"
        height="41"
        viewBox="0 0 25 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d)">
          <path
            d="M9.24875 9.84447L6.04515 26.0138C5.56213 28.4517 7.14687 30.8195 9.58476 31.3025L10.4256 31.4691C12.3991 31.8601 14.3159 30.5773 14.7069 28.6037L19.2252 5.79897C19.559 4.1146 18.464 2.47862 16.7797 2.1449V2.1449C15.0953 1.81118 13.4593 2.90609 13.1256 4.59046L9.60311 22.3693C9.366 23.5661 10.144 24.7285 11.3407 24.9656V24.9656C12.5375 25.2027 13.6999 24.4248 13.9371 23.228L16.3115 11.2438"
            stroke={isFocus ? '0%' : '#B5B5B5'}
            strokeLinecap="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="0.582886"
            y="0.412354"
            width="23.8342"
            height="40.3524"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
export { IconClip }
