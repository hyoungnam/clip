import React from 'react'

function IconAdd() {
  return (
    <svg
      width="36px"
      height="36px"
      viewBox="0 0 40 26"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>Combined Shape</title>
      <defs>
        <radialGradient
          cx="90.3323405%"
          cy="-12.3320782%"
          fx="90.3323405%"
          fy="-12.3320782%"
          r="71.7347196%"
          gradientTransform="translate(0.903323,-0.123321),rotate(124.211055),scale(1.000000,0.889137),translate(-0.903323,0.123321)"
          id="radialGradient-1"
        >
          <stop stopColor="#7856FF" stopOpacity="0" offset="0%"></stop>
          <stop stopColor="#7856FF" stopOpacity="0.0326974643" offset="0%"></stop>
          <stop stopColor="#7856FF" offset="100%"></stop>
        </radialGradient>
        <path
          d="M69,914 C70.1045695,914 71,914.895431 71,916 L71,926 L81,926 C82.1045695,926 83,926.895431 83,928 L83,932 C83,933.104569 82.1045695,934 81,934 L71,934 L71,944 C71,945.104569 70.1045695,946 69,946 L65,946 C63.8954305,946 63,945.104569 63,944 L63,934 L53,934 C51.8954305,934 51,933.104569 51,932 L51,928 C51,926.895431 51.8954305,926 53,926 L62.999,926 L63,916 C63,914.895431 63.8954305,914 65,914 L69,914 Z"
          id="path-2"
        ></path>
        <filter
          x="-25.0%"
          y="-12.5%"
          width="150.0%"
          height="150.0%"
          filterUnits="objectBoundingBox"
          id="filter-3"
        >
          <feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur
            stdDeviation="2"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          ></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Combined-Shape" transform="translate(-47.000000, -914.000000)">
          <use fill="black" fillOpacity="1" filter="url(#filter-3)" xlinkHref="#path-2"></use>
          <use fill="url(#radialGradient-1)" fillRule="evenodd" xlinkHref="#path-2"></use>
        </g>
      </g>
    </svg>
  )
}

export { IconAdd }
