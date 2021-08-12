import React from 'react'

function IconQuick() {
  return (
    <svg width="29" height="42" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <path
          d="M4.63286 19.1053L12.9454 0.590418C13.1067 0.231145 13.4639 0 13.8577 0H19.189C19.8723 0 20.3543 0.670004 20.1372 1.31785L16.5997 11.8703C16.3825 12.5181 16.8645 13.1881 17.5478 13.1881H23.1336C23.9319 13.1881 24.4083 14.0774 23.9662 14.742L11.5573 33.3935C10.9698 34.2765 9.59264 33.7579 9.73359 32.7067L11.2165 21.6478C11.2969 21.048 10.8305 20.5149 10.2254 20.5149H5.54513C4.81984 20.5149 4.33579 19.7669 4.63286 19.1053Z"
          fill="url(#paint0_linear)"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.543945"
          y="0"
          width="27.5913"
          height="41.8429"
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
        <linearGradient
          id="paint0_linear"
          x1="15"
          y1="21"
          x2="35.5"
          y2="-7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7856FF" />
          <stop offset="1" stopColor="#7856FF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export { IconQuick }
